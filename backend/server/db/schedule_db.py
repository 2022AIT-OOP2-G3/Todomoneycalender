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
        func.date_format(
            Schedule.starting_date_time, '%Y-%m') <= month.strftime('%Y-%m'),
        func.date_format(
            Schedule.ending_date_time, '%Y-%m') >= month.strftime('%Y-%m')
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
            Schedule.starting_date_time, '%Y-%m-%d') <= date.strftime('%Y-%m-%d'),
        func.date_format(
            Schedule.ending_date_time, '%Y-%m-%d') >= date.strftime('%Y-%m-%d')
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


def delete_schedule(id: int):
    """スケジュールを削除する

    Args:
        id(int):スケジュールID
    """
    session = get_db_session()
    session.query(Schedule).filter(Schedule.id == id).delete()
    session.commit()
    session.close()


def change_schedule(schedule):
    """スケジュールを変更する

    """
    session = get_db_session()
    session.query(Schedule).filter(Schedule.id == schedule.id).update(
        {
            'starting_date_time': schedule.starting_date_time,
            'ending_date_time': schedule.ending_date_time,
            'item': schedule.item,
            'spending_amount': schedule.spending_amount,
            'income_amount': schedule.income_amount,
        }
    )
    session.commit()
    session.close()
