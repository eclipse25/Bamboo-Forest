import pandas as pd
from sqlalchemy import create_engine, MetaData, Table, Column, String
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.inspection import inspect
from sqlalchemy.sql import text


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
    engine = create_engine('sqlite:///../../fastapi/database.db')
    metadata = MetaData()
    inspector = inspect(engine)

    colleges_table = Table(
        'colleges', metadata,
        Column('school_code', String, nullable=False),  # NOT NULL 제약 조건 추가
        Column('school_name', String),
        Column('address', String)
    )

    try:
        with engine.connect() as connection:
            if inspector.has_table("colleges"):
                connection.execute(text('DROP TABLE IF EXISTS colleges'))
                print("Existing table 'colleges' was dropped.")

            colleges_table.create(connection)
            print("New table 'colleges' was created.")

            colleges.to_sql('colleges', con=engine, index=False, if_exists='append', dtype={
                'school_code': String,
                'school_name': String,
                'address': String
            })
            print("Data successfully loaded into database with NOT NULL constraint.")

    except SQLAlchemyError as e:
        print(f"An error occurred: {e}")


if __name__ == "__main__":
    load_data()
