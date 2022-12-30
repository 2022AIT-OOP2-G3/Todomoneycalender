from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String,Integer
from db.dbUtility import get_db_engine


Base = declarative_base()

class Item(Base):
    __tablename__ = 'item'

    date = Column(String)
    item = Column(String)
    value = Column(Integer)
    

Base.metadata.create_all(bind=get_db_engine())