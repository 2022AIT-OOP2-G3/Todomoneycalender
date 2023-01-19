import datetime as t
from typing import List

from sqlalchemy import func

from model.schedule_model import Schedule
from settings import get_db_session


def get_monthly_schedules(uid: str, month: t.datetime) -> List[Schedule]:
    """指定した月のスケジュールを取得する

    Args:
        uid (str): ユーザーID
        month (t.datetime): 月

    Returns:
        List[Schedule]: スケジュールのリスト
    """
    session = get_db_session()
    schedules = session.query(Schedule).filter(
        Schedule.uid == uid,
        func.date_format(Schedule.starting_date,
                         '%Y-%m') == month.strftime('%Y-%m')
    ).all()
    session.close()
    return schedules


def get_daily_schedules(uid: str, date: t.datetime) -> List[Schedule]:
    """指定した日のスケジュールを取得する

    Args:
        uid (str): ユーザーID
        date (t.datetime): 日付

    Returns:
        List[Schedule]: スケジュールのリスト
    """
    session = get_db_session()
    schedules = session.query(Schedule).filter(
        Schedule.uid == uid,
        func.date_format(
            Schedule.starting_date, '%Y-%m-%d') == date.strftime('%Y-%m-%d')
    ).all()
    session.close()
    return schedules


def add_schedule(schedule: Schedule):
    """スケジュールを追加する

    Args:
        schedule(Schdule): 登録するスケジュールのモデル
    """
    session = get_db_session()
    session.add(schedule)
    session.commit()
    session.close()
