from fastapi import FastAPI
from api.boards import router as board_router
from api.school_api import router as school_router
from api.posts import router as post_router
from fastapi.middleware.cors import CORSMiddleware

# FastAPI 애플리케이션 인스턴스 생성
app = FastAPI()


# 각 라우터를 애플리케이션에 추가
app.include_router(board_router, prefix="/api")
app.include_router(school_router, prefix="/api")
app.include_router(post_router, prefix="/api")


# 라우트 정의
@app.get("/")
def read_root():
    return {"message": "Hello, World!"}


# 애플리케이션 실행
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


origins = [
    "http://localhost:3000",  # React 애플리케이션 주소
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
