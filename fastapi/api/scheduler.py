# import atexit
# from apscheduler.schedulers.background import BackgroundScheduler
# from sqlalchemy.orm import Session
# from sqlalchemy import func, desc
# from datetime import datetime, timedelta
# import pytz
# from .database import get_db
# from .models import Post
# import logging
# import threading

# # scheduler 사용시 main.py에 다음 코드 추가
# ```
# from api.scheduler import initialize_scheduler, scheduler
# from contextlib import asynccontextmanager
# import logging

# # 로깅 설정
# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# # lifespan 이벤트 핸들러 설정
# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     logger.info("Initializing scheduler")
#     initialize_scheduler()
#     yield
#     scheduler.shutdown()

# app.router.lifespan_context = lifespan
# ```

# logger = logging.getLogger("scheduler")

# # 캐시 데이터 저장 변수 및 Lock
# trending_boards_cache = []
# cache_lock = threading.Lock()
# cache_updated_event = threading.Event()

# # 스케줄러 설정
# scheduler = BackgroundScheduler()


# # 최근 일주일간 글이 많이 올라온 게시판 캐시 업데이트 함수
# def update_trending_boards():
#     logger.info("update_trending_boards() was called")

#     global trending_boards_cache

#     # get_db 함수에서 세션을 가져옴
#     db_generator = get_db()
#     db = next(db_generator)

#     try:
#         last_week = datetime.now(pytz.utc) - timedelta(days=7)
#         logger.info(f"Calculating trending boards since: {last_week}")

#         # 트렌딩 게시판을 조회
#         posts = db.query(
#             Post.board_id, func.count(Post.id).label('post_count')
#         ).filter(
#             Post.created_at >= last_week
#         ).group_by(
#             Post.board_id
#         ).order_by(
#             desc('post_count'), Post.board_id
#         ).limit(5).all()

#         logger.info(f"Trending posts query result: {posts}")
#         with cache_lock:
#             trending_boards_cache = [
#                 {"board_id": post.board_id, "post_count": post.post_count} for post in posts
#             ]

#         if trending_boards_cache:
#             logger.info(f"Updated trending boards cache: {
#                         trending_boards_cache}")
#         else:
#             logger.info("No trending boards found.")

#         db.commit()
#         cache_updated_event.set()

#     except Exception as e:
#         logger.error(f"Error updating trending boards cache: {e}")
#     finally:
#         db.close()


# # 스케줄러 초기화 함수
# def initialize_scheduler():
#     if not scheduler.running:
#         scheduler.add_job(update_trending_boards, 'interval', minutes=1)
#         scheduler.start()
#         logger.info("Scheduler initialized and started")
#         update_trending_boards()
#     else:
#         logger.info("Scheduler is already running")


# initialize_scheduler()


# # 애플리케이션이 종료될 때 스케줄러를 종료하도록 설정
# atexit.register(lambda: scheduler.shutdown())
