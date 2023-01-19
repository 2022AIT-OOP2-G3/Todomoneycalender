from datetime import datetime
from typing import Dict, Tuple

from cerberus import Validator
from sqlalchemy import Column, DateTime, Integer, String, func

from settings import get_db_base, get_db_engine

Base = get_db_base()

# テーブルの定義


class Schedule(Base):
    # テーブル名を指定する
    __tablename__ = 'schedules'
    id = Column(Integer, primary_key=True, autoincrement=True,
                nullable=False, unique=True)
    created_at = Column(DateTime, unique=False)
    updated_at = Column(DateTime, unique=False)

    uid = Column(String(255), unique=False, nullable=False)
    starting_date = Column(DateTime, unique=False)
    ending_date = Column(DateTime, unique=False)
    starting_time = Column(DateTime, unique=False)
    ending_time = Column(DateTime, unique=False)
    item = Column(String(255), unique=False)
    spending_amount = Column(Integer, unique=False, default=0)
    income_amount = Column(Integer, unique=False, default=0)

    def __init__(self, uid: str, starting_date: datetime, ending_date: datetime, starting_time: datetime, ending_time: datetime, item: str, spending_amount: int, income_amount: int):
        self.uid = uid
        self.starting_date = starting_date
        self.ending_date = ending_date
        self.starting_time = starting_time
        self.ending_time = ending_time
        self.item = item
        self.spending_amount = spending_amount
        self.income_amount = income_amount

        self.created_at = datetime.now()
        self.updated_at = datetime.now()

    @classmethod
    def get_date_param_name(cls):
        """日付のデータのカラム名の一覧を取得する

        Returns:
            yeild name: 日付のデータのカラム名
        """
        for name in cls.__dict__:
            if name.endswith('_date'):
                yield name

    @classmethod
    def get_time_param_name(cls):
        """時間のデータのカラム名の一覧を取得する

        Returns:
            yeild name: 時間のデータのカラム名
        """
        for name in cls.__dict__:
            if name.endswith('_time'):
                yield name


def validate(params: Dict) -> Tuple[bool, dict]:
    """送られてきたデータのチェックを行う

    Returns:
        bool: データが正常であるか
        str: 失敗した場合、エラーメッセージを返す
    """
    schema = {
        'id' : {'type': 'integer', 'required': False},
        'uid': {'type': 'string', 'required': True, 'maxlength': 255},
        'startingDate': {'type': 'datetime', 'required': True},
        'endingDate': {'type': 'datetime', 'required': True},
        'startingTime': {'type': 'datetime', 'required': True},
        'endingTime': {'type': 'datetime', 'required': True},
        'item': {'type': 'string', 'required': True, 'maxlength': 255},
        'spendingAmount': {'type': 'integer', 'required': True},
        'incomeAmount': {'type': 'integer', 'required': True}
    }
    v = Validator(schema)
    return v.validate(params), v.errors  # type: ignore


def create_table():
    # drop
    Base.metadata.drop_all(bind=get_db_engine())
    # create
    Base.metadata.create_all(bind=get_db_engine())
