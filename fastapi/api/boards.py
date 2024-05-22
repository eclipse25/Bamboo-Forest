from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from .database import SessionLocal, Board
import logging

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


@router.post("/check_or_create_board", response_model=BoardCheckResponse)
async def check_or_create_board(request: BoardCheckRequest):
    logger.info(f"Received request: {request.dict()}")  # dict()로 변경
    db: Session = SessionLocal()
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
async def get_board_info(school_code: str):
    logger.info(f"Fetching board info for school_code: {school_code}")
    db: Session = SessionLocal()
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
