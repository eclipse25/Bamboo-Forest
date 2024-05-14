import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.inspection import inspect
import sqlalchemy


def load_data():
    df = pd.read_excel('학교개황_20220310기준.xlsx', engine='openpyxl')

    selected_columns = df[['학교코드', '학교명', '주소']].rename(columns={
        '학교코드': 'school_code',
        '학교명': 'school_name',
        '주소': 'address'
    })

    selected_columns['school_code'] = selected_columns['school_code'].astype(
        str).str.zfill(7)

    colleges = selected_columns.copy()

    # 데이터베이스 연결 설정
    engine = create_engine(
        'sqlite:///../../fastapi/database.db')
    inspector = inspect(engine)

    try:
        # 데이터베이스에 존재하지 않는 경우에만 삽입
        if not inspector.has_table("colleges"):  # 테이블 존재 확인
            colleges.to_sql('colleges', con=engine, index=False, if_exists='append', dtype={
                'school_code': sqlalchemy.VARCHAR,
                'school_name': sqlalchemy.VARCHAR,
                'address': sqlalchemy.VARCHAR
            })
            print("Data successfully loaded into database.")
        else:
            print("Table 'colleges' already exists. No data was inserted.")
    except SQLAlchemyError as e:
        print(f"An error occurred: {e}")


if __name__ == "__main__":
    load_data()
