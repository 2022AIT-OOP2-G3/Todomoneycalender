import datetime as t
from typing import List

from sqlalchemy import func

from model.payment_model import Payment
from settings import get_db_session


def get_monthly_payment(uid: str, month: t.datetime) -> Payment | None:
    """指定した月の支出を取得する

    Args:
        uid (str): ユーザーID
        month (t.datetime): 月

    Returns:
        Payment: 支出のリスト
    """
    session = get_db_session()
    payment = session.query(Payment).filter(
        Payment.uid == uid,
        func.date_format(Payment.date, '%Y-%m') == month.strftime('%Y-%m')
    ).first()
    session.close()
    return payment


def add_payment(payment: Payment):
    """支出を追加する

    Args:
        uid (str): ユーザーID
        spending_amount (int): 支出額
    """
    session = get_db_session()

    payments = session.query(Payment).filter(
        Payment.uid == payment.uid,
        Payment.date == payment.date
    ).all()

    if payments != []:
        cng = session.query(Payment).filter(
            Payment.uid == payment.uid,
            Payment.date == payment.date
        ).first()
        cng.spending_amount = payment.spending_amount
    else:
        session.add(payment)
    session.commit()
    session.close()
