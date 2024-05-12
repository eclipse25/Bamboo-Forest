from fastapi import FastAPI
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base  # models.py에서 Base 임포트
from api.boards import router as board_router
from api.school_api import router as school_router

# FastAPI 애플리케이션 인스턴스 생성
app = FastAPI()

# SQLAlchemy 데이터베이스 설정
SQLALCHEMY_DATABASE_URL = "sqlite:///./database.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={
                       "check_same_thread": False}, echo=True)

# SQLAlchemy 세션 생성(데이터베이스 세션 생성, 관리하는 팩토리 설정)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 데이터베이스 초기화(연결 및 스키마 생성)
Base.metadata.create_all(bind=engine)  # models.py의 Base.metadata를 사용

# 각 라우터를 애플리케이션에 추가
app.include_router(board_router, prefix="/api")
app.include_router(school_router, prefix="/api")


# 라우트 정의
@app.get("/")
def read_root():
    return {"message": "Hello, World!"}


# 애플리케이션 실행
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
