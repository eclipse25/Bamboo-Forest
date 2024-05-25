from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from datetime import datetime, timedelta
import pytz
from .database import get_db, Board
from .database import Post
import logging
# from .scheduler import trending_boards_cache, cache_lock, cache_updated_event
# from typing import List

router = APIRouter()

# 로깅 설정
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# 요청 모델 정의
class BoardCheckRequest(BaseModel):
    school_code: str
    school_name: str
    address: str
    category: str


# 응답 모델 정의
class BoardCheckResponse(BaseModel):
    school_code: str
    exists: bool


# 응답 모델 정의
class BoardInfoResponse(BaseModel):
    school_code: str
    school_name: str
    address: str
    category: str


# 학교 정보 모델 정의
class SchoolInfo(BaseModel):
    code: str
    school_name: str
    address: str
    category: str


class BoardTrendingResponse(BaseModel):
    board_id: str
    post_count: int


@router.post("/check_or_create_board", response_model=BoardCheckResponse)
async def check_or_create_board(request: BoardCheckRequest, db: Session = Depends(get_db)):
    logger.info(f"Received request: {request.dict()}")
    try:
        board = db.query(Board).filter(Board.id == request.school_code).first()
        if not board:
            board = Board(
                id=request.school_code,
                name=request.school_name,
                address=request.address,
                category=request.category
            )
            db.add(board)
            db.commit()
            db.refresh(board)
            return BoardCheckResponse(school_code=board.id, exists=False)
        return BoardCheckResponse(school_code=board.id, exists=True)
    except Exception as e:
        logger.error(f"Error occurred: {e}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {e}")
    finally:
        db.close()


@router.get("/board_info/{school_code}", response_model=BoardInfoResponse)
async def get_board_info(school_code: str, db: Session = Depends(get_db)):
    logger.info(f"Fetching board info for school_code: {school_code}")
    try:
        logger.info(f"school_code type: {
                    type(school_code)}, value: {school_code}")

        board = db.query(Board).filter(Board.id == school_code).first()
        if not board:
            logger.error(f"Board with school_code {school_code} not found")
            raise HTTPException(status_code=404, detail="Board not found")

        logger.info(f"Found board: {board}")
        return BoardInfoResponse(
            school_code=board.id,
            school_name=board.name,
            address=board.address,
            category=board.category
        )
    except Exception as e:
        logger.error(f"Error occurred: {e}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {e}")
    finally:
        db.close()


@router.get("/boards/trending")  # 캐시를 사용하지 않는 경우
def get_trending_boards_endpoint(db: Session = Depends(get_db)):
    try:
        last_week = datetime.now(pytz.utc) - timedelta(days=7)
        logger.info(f"Calculating trending boards since: {last_week}")

        # 트렌딩 게시판을 조회
        posts = db.query(
            Post.board_id, func.count(Post.id).label('post_count')
        ).filter(
            Post.created_at >= last_week
        ).group_by(
            Post.board_id
        ).order_by(
            desc('post_count'), Post.board_id
        ).limit(5).all()

        logger.info(f"Trending posts query result: {posts}")

        trending_boards = [
            {"board_id": post.board_id, "post_count": post.post_count} for post in posts
        ]

        if trending_boards:
            logger.info(f"Trending boards: {trending_boards}")
        else:
            logger.info("No trending boards found.")

        return trending_boards
    except Exception as e:
        logger.error(f"Error fetching trending boards: {e}")
        return []


# # 트렌딩 게시판 데이터 반환 엔드포인트 - 캐시 사용
# @router.get("/boards/trending", response_model=List[BoardTrendingResponse])
# async def get_trending_boards():
#     logger.info("get_trending_boards() was called")
#     cache_updated_event.wait()  # 캐시가 업데이트될 때까지 대기
#     with cache_lock:
#         return trending_boards_cache
