from sqlalchemy import create_engine, MetaData, Table, Column, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# SQLAlchemy 데이터베이스 설정
SQLALCHEMY_DATABASE_URL = "sqlite:///./database.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={
                       "check_same_thread": False}, echo=True)

# DB 세션 생성하기
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 메타데이터 객체 생성 및 데이터베이스에서 메타데이터 로드
metadata = MetaData()
metadata.reflect(bind=engine)

# Base class 생성하기
Base = declarative_base()

# colleges 테이블 자동 로드
colleges = Table('colleges', metadata, autoload_with=engine)


# colleges 테이블 명시적 정의 (ORM용)
class College(Base):
    __tablename__ = 'colleges'
    school_code = Column(String, primary_key=True, index=True)
    school_name = Column(String, index=True)
    address = Column(String, index=True)
