from fastapi import FastAPI
import sqlite3

# FastAPI 애플리케이션 인스턴스 생성
app = FastAPI()

# SQLite 데이터베이스 연결
conn = sqlite3.connect('database.db')


# 라우트 정의
@app.get("/")
def read_root():
    return {"message": "Hello, World!"}


# 애플리케이션 실행
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
