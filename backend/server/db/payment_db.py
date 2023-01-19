import datetime as t
from typing import List

from sqlalchemy import func

from model.payment_model import Payment
from settings import get_db_session


def get_monthly_payments(uid: str, month: t.datetime) -> Payment:
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
        func.date_format(Payment.date,'%Y-%m') == month.strftime('%Y-%m')
    ).all()
    session.close()
    return payments

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
    
    print(payments)
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
