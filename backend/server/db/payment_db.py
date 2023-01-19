import datetime as t
from typing import List

from sqlalchemy import func

from model.payment_model import Payment
from settings import get_db_session


def get_monthly_payments(uid: str, month: t.datetime) -> List[Payment]:
    """指定した月の支出を取得する

    Args:
        uid (str): ユーザーID
        month (t.datetime): 月

    Returns:
        List[Schedule]: 支出のリスト
    """
    session = get_db_session()
    payments = session.query(Payment).filter(
        Payment.uid == uid,
        func.date_format(Payment.date,
                        '%Y-%m') == month.strftime('%Y-%m')
    ).all()
    session.close()
    return payments

def add_Payment(payment: Payment):
    """スケジュールを追加する

    Args:
        uid (str): ユーザーID
        spending_amount (int): 支出額
    """
    session = get_db_session()
    session.add(payment)
    session.commit()
    session.close()
