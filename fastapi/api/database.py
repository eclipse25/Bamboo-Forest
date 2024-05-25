from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker
from .models import *

# SQLAlchemy 데이터베이스 설정
SQLALCHEMY_DATABASE_URL = "sqlite:///./database.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={
                       "check_same_thread": False}, echo=True)

# DB 세션 생성하기
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 메타데이터 객체 생성 및 데이터베이스에서 메타데이터 로드
metadata = MetaData()
metadata.reflect(bind=engine)

Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
