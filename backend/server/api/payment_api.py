import datetime as t
from typing import cast

import db.payment_db as payment_db
import model.payment_model as payment_model
from flask import Blueprint, jsonify, request
from utility.is_date_convertible import is_date_convertible

payment_module = Blueprint('payment', __name__, url_prefix='/payment')


@payment_module.route('/', methods=['POST'])
def post_payment():
    """支出を追加する

    Returns:
        str: ステータス
    """

    if not request.is_json:
        return jsonify({'status': 'NG', 'message': "deta is not json"})
    json: dict = cast(dict, request.get_json())

    error_message: str = ""
    if "date" not in json:
        error_message += "date is not found"
    else:
        if not is_date_convertible(json["date"] + "-01"):
            error_message += "date is not date"

    json["date"] = t.datetime.strptime(json["date"], '%Y-%m')

    if error_message != "":
        return jsonify({'status': 'NG', 'message': error_message})

    check, errors = payment_model.validate(json)
    if not check:
        return jsonify({'status': 'NG', 'message': errors})

    uid = json['uid']
    spending_amount = json['spendingAmount']
    date = json['date']
    payment = payment_model.Payment(
        uid, date, spending_amount)

    payment_db.add_payment(payment)
    return jsonify({'status': 'OK'})


@ payment_module.route('/<string:uid>/<int:year>/<int:month>', methods=['GET'])
def get_monthly_payments(uid: str, year: int, month: int):
    """指定した月の支出を取得する

    Args:
        uid (str): ユーザーID
        year (int): 年
        month (int): 月

    Returns:
        'spendingAmount'
        'date'
    """
    if not is_date_convertible(f'{year}-{month}-01'):
        return jsonify({'status': 'NG', 'message': 'date is not date'})
    datatime = t.datetime(year, month, 1)
    payment = payment_db.get_monthly_payment(uid, datatime)
    if payment is None:
        return jsonify({'status': 'NG', 'message': 'payment is not found'})

    result = {
        'date': t.datetime.strftime(datatime, '%Y-%m'),
        'spendingAmount': payment.spending_amount
    }

    return jsonify(result)
