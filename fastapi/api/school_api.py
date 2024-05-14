from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
import httpx
from dotenv import load_dotenv
import os
from sqlalchemy.orm import Session
from .database import SessionLocal, College
import logging

router = APIRouter()

# .env 파일로부터 환경 변수를 로드
load_dotenv()

# 로깅 설정
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 학교 정보 모델 정의


class SchoolInfo(BaseModel):
    code: str
    school_name: str
    address: str


# 학교 검색 결과 모델
class SchoolSearchResult(BaseModel):
    school_code: str
    school_name: str
    address: str


# 초중고등학교 검색
@router.get("/k12_schools/", response_model=list[SchoolSearchResult])
async def search_k12_schools(school_name: str = Query(..., min_length=2)):
    API_KEY = os.getenv('school_api_key')
    url = "https://open.neis.go.kr/hub/schoolInfo"
    params = {
        "KEY": API_KEY,
        "Type": "json",
        "pIndex": 1,
        "pSize": 100,
        "SCHUL_NM": school_name
    }
    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params)
        if response.status_code != 200:
            raise HTTPException(
                status_code=404, detail="Unable to fetch school data")

        data = response.json()
        results = []
        try:
            for item in data['schoolInfo'][1]['row']:
                results.append(SchoolSearchResult(
                    school_code=item['SD_SCHUL_CODE'],
                    school_name=item['SCHUL_NM'],
                    address=item['ORG_RDNMA']
                ))
        except KeyError:
            # 만약 데이터가 없다면 빈 리스트 반환
            return []

        return results


# 대학, 대학원 검색
@router.get("/colleges/", response_model=list[SchoolSearchResult])
async def get_colleges_from_database(school_name: str = Query(..., min_length=2)):
    db: Session = SessionLocal()
    try:
        results = db.query(College).filter(
            College.school_name.contains(school_name)).all()
        return [SchoolSearchResult(
            school_code=row.school_code,
            school_name=row.school_name,
            address=row.address
        ) for row in results]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {e}")
    finally:
        db.close()


# 모든 학교 검색
@router.get("/schools/", response_model=list[SchoolSearchResult])
async def search_and_get_schools(school_name: str = Query(..., min_length=2)):
    logger.info(f"Combined search for schools with name: {school_name}")

    k12_schools = await search_k12_schools(school_name)
    logger.info(f"K-12 Schools: {k12_schools}")

    colleges = await get_colleges_from_database(school_name)
    logger.info(f"Colleges: {colleges}")

    combined_results = k12_schools + colleges
    logger.info(f"Combined search results: {combined_results}")

    return combined_results
