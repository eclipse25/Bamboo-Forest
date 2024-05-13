## 학교 이름 검색으로 게시판 찾기

- 초, 중, 고등학교 정보는 나이스 교육정보 개방 포털의 학교 기본정보 API를 활용한다.
- 대학교, 대학원 정보는 공공 데이터 포털에서 2022년 3월 기준 데이터를 xls파일로부터 fastapi 프로젝트의 sqlite3 데이터베이스에 로드하여 사용한다.
- react 프론트엔드에서 검색어를 입력했을 때 API의 검색 결과와, 데이터베이스 검색 결과를 합쳐서 응답한다.
- 학교 이름이 같은 경우가 있기 때문에 주소를 수집한다.
- 게시판 페이지의 간단한 url을 위해 학교코드를 사용한다.
- 기타 종류의 게시판은 이후 추가할 수도 있고 안할 수도 있다..!

### 학교 기본정보 API

- [API 문서 위치](https://open.neis.go.kr/portal/data/service/selectServicePage.do?page=1&rows=10&sortColumn=&sortDirection=&infId=OPEN17020190531110010104913&infSeq=2)
- fastapi/api/school_api.py
- 학교코드, 학교명, 주소 열을 사용한다.

### 교육부\_전국대학교개황

- [API 문서 위치](https://www.data.go.kr/data/15100330/fileData.do)
- Open API 형태가 아닌 xls 파일을 제공받을 수 있다.
- Pandas 데이터프레임으로 학교코드, 학교명, 주소 열만 추출한 후 데이터베이스에 적재한다.
- xls 파일을 지원하는 이전버전의 xlrd 라이브러리가 Pandas와 호환되지 않기 때문에 xlsx 파일로 변환 후 사용하고, 이 파일을 열기 위해 openpyxl 엔진을 사용한다.
