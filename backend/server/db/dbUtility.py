
from sqlalchemy.orm import sessionmaker
from sqlalchemy.engine.url import URL
from sqlalchemy.engine.create import create_engine


user = "username"
password = "password"
host = "localhost:3306"
db_name = "database"

# engineの設定
engine = create_engine(
    f'mysql+mysqlconnector://{user}:{password}@{host}/{db_name}', pool_recycle=10)


def get_db_session():
    return sessionmaker(bind=engine)()


def get_db_engine():
    return engine
