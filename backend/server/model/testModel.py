from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String
from db.dbUtility import get_db_engine


Base = declarative_base()


class Account(Base):
    __tablename__ = 'account'

    email = Column(String, primary_key=True)
    password = Column(String)


Base.metadata.create_all(bind=get_db_engine())
