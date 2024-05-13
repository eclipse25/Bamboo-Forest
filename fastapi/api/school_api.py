from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
import httpx
from dotenv import load_dotenv
import os

router = APIRouter()

# .env 파일로부터 환경 변수를 로드
load_dotenv()


# 학교 정보 모델 정의
class SchoolInfo(BaseModel):
    school_name: str
    address: str


# 학교 검색 결과 모델
class SchoolSearchResult(BaseModel):
    school_name: str
    address: str


@router.get("/schools/", response_model=list[SchoolSearchResult])
async def search_schools(school_name: str = Query(..., min_length=2)):
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
                    school_name=item['SCHUL_NM'],
                    address=item['ORG_RDNMA']
                ))
        except KeyError:
            raise HTTPException(status_code=404, detail="No data found")

        return results
