from datetime import datetime
from typing import Tuple

from cerberus import Validator
from sqlalchemy import Column, DateTime, Integer, String

from settings import get_db_base, get_db_engine

Base = get_db_base()

# テーブルの定義


class Payment(Base):
    # テーブル名を指定する
    __tablename__ = 'payment'
    id = Column(Integer, primary_key=True, autoincrement=True,
                nullable=False, unique=True)
    created_at = Column(DateTime, unique=False)
    updated_at = Column(DateTime, unique=False)

    uid = Column(String(255), unique=False, nullable=False)
    spending_amount = Column(Integer, unique=False, default=0)
    date = Column(DateTime, unique=False)

    def __init__(self, uid: str,date: datetime, spending_amount: int):
        self.uid = uid
        self.spending_amount = spending_amount
        self.date = date

        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        
    @classmethod
    def get_date_param_name(cls):
        for name in cls.__dict__:
            if name.endswith('date'):
                yield name

def validate(params) -> Tuple[bool, dict]:
    schema = {
        'uid': {'type': 'string', 'required': True, 'maxlength': 255},
        'spendingAmount': {'type': 'integer', 'required': True},
        'date': {'type': 'datetime', 'required': True}
    }
    v = Validator(schema)
    return v.validate(params), v.errors  # type: ignore


def create_table():
    # drop
    Base.metadata.drop_all(bind=get_db_engine())
    # create
    Base.metadata.create_all(bind=get_db_engine())
