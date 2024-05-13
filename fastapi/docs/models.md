## Sqlite3 데이터베이스 테이블

### Board(게시판)

| 열명     | 설명            | 데이터 유형 |
| -------- | --------------- | ----------- |
| id       | 게시판 식별자   | String      |
| name     | 게시판 이름     | String      |
| category | 게시판 카테고리 | String      |

### Post(게시글)

| 열명       | 설명                        | 데이터 유형 |
| ---------- | --------------------------- | ----------- |
| id         | 게시물 식별자               | Integer     |
| board_id   | 게시물이 속한 게시판 식별자 | Integer     |
| start_time | 게시물 작성 시작 시간       | DateTime    |
| end_time   | 게시물 작성 종료 시간       | DateTime    |
| content    | 게시물 내용                 | String      |
| views      | 게시물 조회수               | Integer     |
| user_ip    | 게시물 작성자 IP 주소       | String      |
| upvotes    | 게시물 추천 수              | Integer     |
| created_at | 게시물 작성 시간            | DateTime    |
| delete_key | 삭제를 위한 비밀번호        | String      |

### Comment(댓글)

| 열명       | 설명                      | 데이터 유형 |
| ---------- | ------------------------- | ----------- |
| id         | 댓글 식별자               | Integer     |
| post_id    | 댓글이 속한 게시물 식별자 | Integer     |
| content    | 댓글 내용                 | String      |
| user_ip    | 댓글 작성자 IP 주소       | String      |
| upvotes    | 댓글 추천 수              | Integer     |
| created_at | 댓글 작성 시간            | DateTime    |

### User(사용자)

| 열명     | 설명                            | 데이터 유형 |
| -------- | ------------------------------- | ----------- |
| id       | 사용자 식별자                   | Integer     |
| nickname | 사용자 닉네임                   | String      |
| password | 사용자 비밀번호 (해시화된 형태) | String      |

### PostLike(좋아요)

| 열명            | 설명                                | 데이터 유형 |
| --------------- | ----------------------------------- | ----------- |
| id              | 좋아요 식별자                       | Integer     |
| user_id         | 좋아요를 누른 사용자 식별자         | Integer     |
| post_id         | 좋아요를 받은 게시물 식별자         | Integer     |
| remaining_likes | 게시물에 대한 남은 좋아요 가능 횟수 | Integer     |

### FavoriteBoard(즐겨찾기한 게시판)

| 열명     | 설명                        | 데이터 유형 |
| -------- | --------------------------- | ----------- |
| id       | 즐겨찾기 식별자             | Integer     |
| user_id  | 즐겨찾기를 한 사용자 식별자 | Integer     |
| board_id | 즐겨찾기한 게시판 식별자    | Integer     |

### Tag(태그)

| 열명 | 설명        | 데이터 유형 |
| ---- | ----------- | ----------- |
| id   | 태그 식별자 | Integer     |
| name | 태그 이름   | String      |

### PostTag(게시물-태그 연결)

| 열명    | 설명                    | 데이터 유형 |
| ------- | ----------------------- | ----------- |
| post_id | 게시물 식별자 (외래 키) | Integer     |
| tag_id  | 태그 식별자 (외래 키)   | Integer     |

### colleges(대학, 대학원 리스트)

| 열명        | 설명     | 데이터 유형 |
| ----------- | -------- | ----------- |
| school_code | 학교코드 | String      |
| school_name | 학교명   | String      |
| address     | 주소     | String      |
