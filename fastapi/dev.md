## 환경 설정

### 가상환경

프로젝트간 충돌 문제를 방지,동일한 환경에서의 개발, 프로젝트 관리를 위해 가상환경을 사용한다.

- 가상환경 생성

  ```bash
  # Windows에서:
  python -m venv venv

  # macOS/Linux에서:
  python3 -m venv venv
  ```

- 가상환경 실행

  ```bash
  # Windows에서:
  venv\Scripts\activate

  # macOS/Linux에서:
  source venv/bin/activate
  ```

- 현재 가상환경의 모든 패키지 목록 확인하기

  ```bash
  pip list
  ```

- 설치된 패키지 목록 저장하기

  ```bash
  pip freeze > requirements.txt
  ```

- requirements.txt 파일에 명시된 모든 패키지 설치하기

  ```bash
  pip install -r requirements.txt
  ```

- 가상환경 종료

  ```bash
  deactivate
  ```

### FastAPI 설치

FastAPI로 개발하기 위해서 파이썬과 FastAPI, uvicorn과 추가적인 패키지들을 설치한다.

**uvicorn**은 Python으로 작성된 빠르고 가벼운 ASGI(Asynchronous Server Gateway Interface) 웹 서버이다. FastAPI는 ASGI를 기반으로 하여 구축된 웹 프레임워크이며, uvicorn은 FastAPI 애플리케이션을 실행하기 위해 가장 많이 사용되는 서버이다. uvicorn은 비동기적인 요청을 처리하고, 높은 처리량과 속도를 제공하는데 특화되어 있다. 이런 이유로 FastAPI 애플리케이션을 실행하려면 uvicorn을 함께 설치해야 한다.

- FastAPI와 관련 패키지 설치

  ```bash
  pip install fastapi[all] uvicorn
  ```

## 프로젝트 개발

### 서버 실행

- 로컬에서 실행하기

  ```bash
  uvicorn main:app --reload
  ```

### 데이터베이스

- sqlite로 개발 후 배포 시 AWS RDS의 postgresql로 이전
