from datetime import datetime
from typing import Dict, Tuple
from utility.convert_json_key import convert_to_camel, convert_to_snake
import inspect

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
    starting_date_time = Column(DateTime, unique=False)
    ending_date_time = Column(DateTime, unique=False)
    item = Column(String(255), unique=False)
    spending_amount = Column(Integer, unique=False, default=0)
    income_amount = Column(Integer, unique=False, default=0)

    def __init__(self, uid: str, starting_date_time: datetime, ending_date_time: datetime, item: str, spending_amount: int, income_amount: int):
        self.uid = uid
        self.starting_date_time = starting_date_time
        self.ending_date_time = ending_date_time
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
            if name.endswith('_date_time'):
                yield name

    @classmethod
    def get_param_name(cls):
        """カラム名の一覧を取得する

        Returns:
            yeild name: カラム名
        """
        aneditable_param = ['id', 'created_at', 'updated_at']
        method_list = list(map(
            lambda x: x[0], inspect.getmembers(cls, inspect.ismethod)))
        for name in cls.__dict__:
            if name.startswith('_') or name in aneditable_param or name in method_list:
                continue
            yield name

    @classmethod
    def generate_from_json(cls, params: Dict):
        """JSONからデータを生成する

        Args:
            params (Dict): JSONのデータ

        Returns:
            Schedule: 生成したデータ
        """
        object_params = {}
        for name in cls.get_param_name():
            json_name = convert_to_camel(name)
            if json_name not in params:
                object_params[name] = None
            else:
                object_params[name] = params[json_name]
        return cls(**object_params)


def validate(params: Dict) -> Tuple[bool, dict]:
    """送られてきたデータのチェックを行う

    Returns:
        bool: データが正常であるか
        str: 失敗した場合、エラーメッセージを返す
    """
    schema = {
        'uid': {'type': 'string', 'required': True, 'maxlength': 255},
        'startingDateTime': {'type': 'datetime', 'required': True},
        'endingDateTime': {'type': 'datetime', 'required': True},
        'item': {'type': 'string', 'required': True, 'maxlength': 255},
        'spendingAmount': {'type': 'integer', 'required': True},
        'incomeAmount': {'type': 'integer', 'required': True}
    }
    # 他のパラメータがあった場合でもエラーにならないようにする
    v = Validator(schema, allow_unknown=True)
    return v.validate(params), v.errors  # type: ignore


def is_valid_parametor(params) -> Tuple[bool, str]:
    """有効なパラメータかどうかを判定する

    Returns:
        bool: 有効なパラメータであるか
        str: 失敗した場合、エラーメッセージを返す
    """
    message = ''

    for name in params:
        if convert_to_snake(name) not in Schedule.get_param_name():
            message = f'invalid parameter: {name}'

    return True if message == '' else False, message


def create_table():
    # drop
    Base.metadata.drop_all(bind=get_db_engine())
    # create
    Base.metadata.create_all(bind=get_db_engine())
