# Bamboo-Forest

**FastAPI**와 **React**를 사용한 CRUD, RESTful API 기반 대나무숲 개발 프로젝트

## 주요 기능


- **게시판(국내 학교, 대학원) 검색**
  - `[GET] /api/k12_schools/` : 나이스 학교기본정보 api를 활용한 초중고등학교 검색
  - `[GET] /api/colleges/` : DB colleges 테이블로부터 대학교, 대학원 검색
  - `[GET] /api/schools` : 위의 두 api에서의 결과를 합친 검색 결과 반환
- **학교 검색 결과에서 학교 클릭 시 해당 학교의 게시판으로 연결**
  - `[POST] /api/check_or_create_board` : 학교 최초 클릭시 DB의 boards 테이블에 게시판 항목 생성
  - `[GET] /api/board_info/${school_code}` : 학교 코드에 맞는 학교 이름, 주소, 카테고리 정보 반환
- **게시글 작성과 해당하는 게시판에 렌더링**
  - `[POST] api/posts/` : 게시판에서 게시물 작성
  - `[GET] api/posts/board/{board_id}` : 게시판에서 게시판 코드(학교 코드)에 맞는 게시물 리스트를 반환
  - `[GET] api/posts/{post_id}` : 좋아요, 댓글 동기화시 게시물 정보 반환
- **홈페이지에 모든 게시물 반환** :
  - `[GET] api/posts/all` : 모든 게시물 반환
- **게시물별 댓글 작성**
  - `[POST] api/posts/{post_id}/comments` : commemts 테이블에 게시글 id가 해당 포스트의 id인 항목 생성
  - `[GET] api/posts/{post_id}/comments` : 각 게시물에의 댓글 반환
- **게시물별 좋아요**
  - 쿠키 활용
  - `[POST] api/posts/{post_id}/upvote` : 좋아요 클릭시 posts 테이블에서 해당 포스트의 좋아요 수 증가
  - `[POST] api/posts/{post_id}/downvote` : 좋아요 취소시 posts 테이블에서 해당 포스트의 좋아요 수 감소
- **메뉴바에 방문했던 게시판 표시 및 삭제**
  - 쿠키 활용
- **게시물 작성 시점에 입력한 키를 통해 게시물 삭제 가능**
  - `[DELETE] api/posts/{post_id}` : 게시물과 관련된 댓글, 태그 삭제 및 조정
- **게시물이 많은 게시판 메뉴바에 표시**
  - `[GET] api/boards/trending` : 최근 일주일간 게시물이 많이 올라온 게시판 상위 5개 표시



#### 3차 개발 목표

- AI api를 활용한 광고, 불건전 게시물 등 이슈게시물 필터링
- 구글 애드센스 적용
- 서버 추가 + 로드밸런싱
