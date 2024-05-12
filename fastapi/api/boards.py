from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()


# 게시판 모델 정의
class BoardCreate(BaseModel):
    name: str
    category: str


class BoardDisplay(BaseModel):
    id: int
    name: str
    category: str


# 게시판 관련 API
@router.get("/boards", response_model=List[BoardDisplay])
async def get_all_boards():
    return [{"id": 1, "name": "Science", "category": "Education"}]


@router.post("/boards", response_model=BoardDisplay)
async def create_board(board: BoardCreate):
    return {"id": 1, "name": board.name, "category": board.category}


@router.get("/boards/{board_id}", response_model=BoardDisplay)
async def get_board(board_id: int):
    return {"id": board_id, "name": "Math", "category": "Education"}
