import datetime as t
from typing import cast

from flask import Blueprint, jsonify, request

import db.payment_db as payment_db
import model.payment_model as payment_model
from utility.is_date_convertible import (is_date_convertible)

from utility.convert_json_key import convert_to_camel

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
    for param in payment_model.Payment.get_date_param_name():
        json_key = convert_to_camel(param)
        if json_key not in json:
            error_message += f"{param} is not found\n"
            continue
        if not is_date_convertible(json[json_key]):
            error_message += f"{param} is not date\n"
            continue
        json[json_key] = t.datetime.strptime(json[json_key], '%Y-%m-%d')
    
    if error_message != "":
        return jsonify({'status': 'NG', 'message': error_message})
    
    check, errors = payment_model.validate(json)
    if not check:
        return jsonify({'status': 'NG', 'message': errors})

    uid = json['uid']
    spending_amount = json['spendingAmount']
    date = json['date']
    payment = payment_model.Payment(
        uid,date,spending_amount)
    
    payment_db.add_Payment(payment)
    return jsonify({'status': 'OK'})


@ payment_module.route('/<string:uid>/<int:year>/<int:month>', methods=['GET'])
def get_monthly_payments(uid: str, year: int, month: int):
    """指定した月の支出を取得する

    Args:
        uid (str): ユーザーID
        year (int): 年
        month (int): 月

    Returns:
        List[Payment]: 支出のリスト
    """
    if not is_date_convertible(f'{year}-{month}-01'):
        return jsonify({'status': 'NG', 'message': 'date is not date'})
    datatime = t.datetime(year, month, 1)
    payments = payment_db.get_monthly_payments(uid, datatime)

    total_spending_amount = sum(
        map(lambda payment: payment.spending_amount, payments)
    )

    result = {
        'date': t.datetime.strftime(datatime, '%Y-%m'),
        'spendingAmount': total_spending_amount,
        'payment': list(map(lambda payment:
                        {
                            'spendingAmount': payment.spending_amount,
                        },
            payments
        ))
    }

    return jsonify(result)