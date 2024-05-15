## FastAPI, React 실행과 독립적인 스크립트 파일

### college_data

- 게시판 검색에서의 학교 검색은 api(초중고등학교) + 데이터베이스(대학, 대학원)로 이루어진다.
- `college_data` 폴더의 `insert_college_data.py`는 공공 데이터 포털에서의 국내 대학/대학원 현황 문서를 활용해 1회성으로 데이터베이스의 colleges 테이블로 적재하는 역할을 한다.
- 기존의 colleges 테이블이 있다면 삭제 후 테이블을 생성한다.
