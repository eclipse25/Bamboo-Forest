from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from sqlalchemy.orm import Session
from .database import SessionLocal, Post, Board, Tag, PostTag
import logging

router = APIRouter()

# 로깅 설정
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# 요청 모델 정의
class PostCreateRequest(BaseModel):
    board_id: str
    content: str
    delete_key: str
    hashtags: list[str]


# 응답 모델 정의
class PostCreateResponse(BaseModel):
    id: int
    board_id: str
    content: str
    created_at: str
    hashtags: list[str]


@router.post("/posts", response_model=PostCreateResponse)
async def create_post(request: PostCreateRequest, http_request: Request):
    logger.info(f"Received request: {request.model_dump()}")
    db: Session = SessionLocal()
    try:
        board_id = int(request.board_id)  # 문자열로 받은 board_id를 정수로 변환
        board = db.query(Board).filter(Board.id == board_id).first()
        if not board:
            raise HTTPException(status_code=404, detail="Board not found")

        new_post = Post(
            board_id=board.id,
            content=request.content,
            user_ip=http_request.client.host,
            delete_key=request.delete_key
        )

        db.add(new_post)
        db.commit()  # 첫 번째 커밋
        logger.info(f"New post committed with ID: {new_post.id}")
        db.refresh(new_post)

        # 태그 처리
        tags = []
        for tag_name in request.hashtags:
            tag = db.query(Tag).filter(Tag.name == tag_name).first()
            if not tag:
                tag = Tag(name=tag_name)
                db.add(tag)
                db.commit()
                db.refresh(tag)
                tag.usage_count = 1
                logger.info(f"New tag created and committed: {tag.name}")
            else:
                tag.usage_count += 1
                logger.info(f"Tag {tag.name} usage count updated to {
                            tag.usage_count}")
            tags.append(tag)
            # PostTag 테이블에 관계 추가
            post_tag = PostTag(post_id=new_post.id, tag_id=tag.id)
            db.add(post_tag)

        db.commit()  # 두 번째 커밋
        logger.info(f"Tags associated with post ID: {new_post.id} committed")

        return PostCreateResponse(
            id=new_post.id,
            board_id=str(new_post.board_id),  # 응답에서는 문자열로 반환
            content=new_post.content,
            created_at=new_post.created_at.isoformat(),
            hashtags=[tag.name for tag in tags]
        )
    except Exception as e:
        logger.error(f"Error occurred: {e}")
        db.rollback()  # 예외 발생 시 롤백
        raise HTTPException(
            status_code=500, detail="An error occurred while creating the post")
    finally:
        db.close()
