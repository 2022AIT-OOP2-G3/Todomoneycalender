import datetime as t
from typing import cast

import db.payment_db as payment_db
import db.schedule_db as schedule_db
import model.schedule_model as schedule_model
from flask import Blueprint, jsonify, request
from settings import date_time_format, manth_format
from utility.convert_json_key import convert_to_camel
from utility.is_date_convertible import (is_date_convertible,
                                         is_date_time_convertible,
                                         is_manth_convertible)

schedule_module = Blueprint('schedule', __name__, url_prefix='/schedule')


def debug_print(*args, **kwargs):
    def _debug_print(*args, **kwargs):
        print(*args, **kwargs)
    return _debug_print


@schedule_module.route('/', methods=['POST'])
def post_schedule():
    """スケジュールを追加する

    Returns:
        str: ステータス
    """

    if not request.is_json:
        return jsonify({'status': 'NG', 'message': "data is not json"})
    json: dict = cast(dict, request.get_json())

    error_message: str = ""

    for param in schedule_model.Schedule.get_date_param_name():
        json_key = convert_to_camel(param)
        if json_key not in json:
            error_message += f"{param} is not found\n"
            continue
        if not is_date_time_convertible(json[json_key]):
            error_message += f"{param} is not datetime\n"
            continue
        json[json_key] = t.datetime.strptime(json[json_key], date_time_format)

    if error_message != "":
        return jsonify({'status': 'NG', 'message': error_message})

    check, errors = schedule_model.validate(json)
    if not check:
        return jsonify({'status': 'NG', 'message': errors})

    schedule = schedule_model.Schedule.generate_from_json(json)
    schedule_db.add_schedule(schedule)
    return jsonify({'status': 'OK'})


@ schedule_module.route('/<string:uid>/<int:year>/<int:month>', methods=['GET'])
def get_monthly_schedules(uid: str, year: int, month: int):
    """指定した月のスケジュールを取得する

    Args:
        uid (str): ユーザーID
        year (int): 年
        month (int): 月
    """
    if not is_manth_convertible(f'{year}-{month}'):
        return jsonify({'status': 'NG', 'message': 'data is not date'})
    datetime = t.datetime(year, month, 1)
    schedules = schedule_db.get_monthly_schedules(uid, datetime)
    payment = payment_db.get_monthly_payment(uid, datetime)
    spending_amount = payment.spending_amount if payment else 0

    total_using_amount = sum(
        map(lambda schedule: schedule.spending_amount, schedules)
    )
    total_income_amount = sum(
        map(lambda schedule: schedule.income_amount, schedules)
    )

    result = {
        'date': t.datetime.strftime(datetime, '%Y-%m'),
        'spendingAmount': spending_amount,
        'usingAmount': total_using_amount,
        'incomeAmount': total_income_amount,
        'schedule': list(map(lambda schedule:
                         {
                             'id': schedule.id,
                             'startingDateTime': schedule.starting_date_time.strftime(date_time_format),
                             'endingDateTime': schedule.ending_date_time.strftime(date_time_format),
                             'item': schedule.item,
                             'spendingAmount': schedule.spending_amount,
                         },
            schedules
        ))
    }

    return jsonify(result)


@ schedule_module.route('/<string:uid>/<int:year>/<int:month>/<int:day>', methods=['GET'])
def get_daily_schedules(uid: str, year: int, month: int, day: int):
    """指定した日のスケジュールを取得する

    Args:
        uid (str): ユーザーID
        year (int): 年
        month (int): 月
        day (int): 日
    """

    if not is_date_convertible(f'{year}-{month}-{day}'):
        return jsonify({'status': 'NG', 'message': 'data is not date'})

    datatime = t.datetime(year, month, day)
    schedules = schedule_db.get_daily_schedules(uid, datatime)
    result = list(map(lambda schedule:
                      {
                          "id": schedule.id,
                          "startingDateTime": schedule.starting_date_time.strftime(date_time_format),
                          "endingDateTime": schedule.ending_date_time.strftime(date_time_format),
                          "item": schedule.item,
                          "spendingAmoun": schedule.spending_amount,
                          "incomeAmount": schedule.income_amount,
                      },
                      schedules
                      ))
    return jsonify(result)


@ schedule_module.route('/<int:id>', methods=['DELETE'])
def delete_schedule(id: int):
    """指定した日のスケジュールを削除する

    Args:
        id (int): スケジュールID

    """
    schedule_db.delete_schedule(id)
    return jsonify({'status': 'OK'})


@ schedule_module.route('/', methods=['PUT'])
def change_schedule():
    """指定したスケジュールを変更する
    """
    if not request.is_json:
        return jsonify({'status': 'NG', 'message': "data is not json"})
    json: dict = cast(dict, request.get_json())

    error_message: str = ""

    for param in schedule_model.Schedule.get_date_param_name():
        json_key = convert_to_camel(param)
        if json_key not in json:
            continue
        if not is_date_time_convertible(json[json_key]):
            error_message += f"{param} is not date\n"
            continue
        json[json_key] = t.datetime.strptime(json[json_key], date_time_format)

    if error_message != "":
        return jsonify({'status': 'NG', 'message': error_message})

    if "id" not in json:
        return jsonify({'status': 'NG', 'message': "id is not found"})

    if not isinstance(json["id"], int):
        return jsonify({'status': 'NG', 'message': "id is not int"})

    id = json["id"]
    del json["id"]

    check, errors = schedule_model.is_valid_parametor(json)
    if not check:
        return jsonify({'status': 'NG', 'message': errors})

    schedule = schedule_model.Schedule.generate_from_json(json)
    schedule.id = id  # type: ignore
    schedule_db.change_schedule(schedule)
    return jsonify({'status': 'OK'})
