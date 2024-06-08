import pandas as pd
from sqlalchemy import create_engine, MetaData, Table, Column, String
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.inspection import inspect
from sqlalchemy.sql import text


def load_data():
    df_k12 = pd.read_csv("학교기본정보_2024년05월31일기준.csv", encoding='cp949')

    # 필요한 열만 추출
    df_k12 = df_k12.loc[:, ['학교명', '학교종류명', '도로명주소']]
    df_k12.columns = ['group_name', 'group_type', 'address']

    # 비어 있는 항목을 가진 행 삭제
    df_k12 = df_k12.dropna()


    df_college = pd.read_excel('학교개황_20220310기준.xlsx', engine='openpyxl')

    df_college = df_college[['학교명', '학교구분', '주소']].rename(columns={
    '학교명': 'group_name',
    '학교구분': 'group_type',
    '주소': 'address'
})

    df_college['group_type'] = df_college['group_type'].replace('대학', '대학교')

    df_college = df_college.dropna()

    df_combined = pd.concat([df_k12, df_college], ignore_index=True)

    # 행 순서에 따른 새로운 index 열 추가
    df_boards = df_combined.reset_index(drop=True)
    df_boards['board_id'] = df_boards.index + 1000000

    # 인덱스 열을 가장 앞으로 이동
    cols = df_boards.columns.tolist()
    cols = cols[-1:] + cols[:-1]  # 'index' 열을 가장 앞으로 이동
    df_boards = df_boards[cols]


    ## 이 부분부터 Django PostgreSQL에 따라 수정 필요 (24.06.08)

    # 데이터베이스 연결 설정
    engine = create_engine('sqlite:///../../fastapi/database.db')
    metadata = MetaData()
    inspector = inspect(engine)

    colleges_table = Table(
        'colleges', metadata,
        Column('board_id', String, nullable=False),
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
