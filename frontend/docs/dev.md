## 개발 환경 설정

1. Node.js와 npm 설치
2. React 앱 생성

   ```bash
   npx create-react-app react-frontend
   cd react-frontend
   npm start
   ```

3. React와 FastAPI 연결
   React 앱 (클라이언트)와 FastAPI (서버)를 연결하기 위해, React 앱에서 API 요청을 보내 데이터를 가져온다.
   fetch API나 axios 라이브러리를 사용한다.

   - FastAPI의 main.py에서 CORS 설정

     ```bash
     from fastapi import FastAPI
     from fastapi.middleware.cors import CORSMiddleware

     app = FastAPI()

     app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],  # React 앱의 URL
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
     )
     ```

   - React에서 FastAPI로 API 요청 보내기
   - useEffect 훅을 사용하여 컴포넌트가 마운트될 때 FastAPI 서버로부터 데이터를 불러온다.
