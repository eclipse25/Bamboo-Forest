## FastAPI, React 실행과 독립적인 스크립트 파일

### boards_table (Django PostgreSQL에서 사용)

- 아래 college_data를 개량해서 대학교와 대학원뿐 아니라 초중고를 포함한 모든 게시판 정보를 데이터베이스에서만 찾아서 불러오도록 데이터 프레임으로 만든 후 boards 테이블을 생성하는 일회성 코드이다.
- 이후 추가되는 게시판 그룹은 api를 통해 테이블에 한 행씩 추가한다.
- 그룹 이름, 그룹 타입, 주소 3개 열과 인덱스 열로 이루어진다.

### college_data (FastAPI SQLite에서 사용)

- 게시판 검색에서의 학교 검색은 api(초중고등학교) + 데이터베이스(대학, 대학원)로 이루어진다.
- `college_data` 폴더의 `insert_college_data.py`는 공공 데이터 포털에서의 국내 대학/대학원 현황 문서를 활용해 1회성으로 데이터베이스의 colleges 테이블로 적재하는 역할을 한다.
- 기존의 colleges 테이블이 있다면 삭제 후 테이블을 생성한다.
