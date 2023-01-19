import datetime as t
from typing import cast

from flask import Blueprint, jsonify, request

import db.schedule_db as schedule_db
import model.schedule_model as schedule_model
from utility.is_date_convertible import (is_date_convertible,
                                     is_time_convertible)

from utility.convert_json_key import convert_to_camel

schedule_module = Blueprint('schedule', __name__, url_prefix='/schedule')


@schedule_module.route('/', methods=['POST'])
def post_schedule():
    """スケジュールを追加する

    Returns:
        str: ステータス
    """

    if not request.is_json:
        return jsonify({'status': 'NG', 'message': "deta is not json"})
    json: dict = cast(dict, request.get_json())

    error_message: str = ""

    for param in schedule_model.Schedule.get_date_param_name():
        json_key = convert_to_camel(param)
        if json_key not in json:
            error_message += f"{param} is not found\n"
            continue
        if not is_date_convertible(json[json_key]):
            error_message += f"{param} is not date\n"
            continue
        json[json_key] = t.datetime.strptime(json[json_key], '%Y-%m-%d')

    for param in schedule_model.Schedule.get_time_param_name():
        json_key = convert_to_camel(param)
        if json_key not in json:
            error_message += f"{param} is not found\n"
            continue
        if not is_time_convertible(json[json_key]):
            error_message += f"{param} is not time\n"
            continue
        json[json_key] = t.datetime.strptime(json[json_key], '%H:%M')

    if error_message != "":
        return jsonify({'status': 'NG', 'message': error_message})

    check, errors = schedule_model.validate(json)
    if not check:
        return jsonify({'status': 'NG', 'message': errors})

    uid = json['uid']
    starting_date = json['startingDate']
    ending_date = json['endingDate']
    starting_time = json['startingTime']
    ending_time = json['endingTime']
    item = json['item']
    spending_amount = json['spendingAmount']
    income_amount = json['incomeAmount']
    schedule = schedule_model.Schedule(
        uid, starting_date, ending_date, starting_time, ending_time, item, spending_amount, income_amount)
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
    if not is_date_convertible(f'{year}-{month}-01'):
        return jsonify({'status': 'NG', 'message': 'date is not date'})
    datatime = t.datetime(year, month, 1)
    schedules = schedule_db.get_monthly_schedules(uid, datatime)

    total_spending_amount = sum(
        map(lambda schedule: schedule.spending_amount, schedules)
    )
    total_using_amount = sum(
        map(lambda schedule: schedule.spending_amount, schedules)
    )
    total_income_amount = sum(
        map(lambda schedule: schedule.income_amount, schedules)
    )

    result = {
        'date': t.datetime.strftime(datatime, '%Y-%m'),
        'spendingAmount': total_spending_amount,
        'usingAmount': total_using_amount,
        'incomeAmount': total_income_amount,
        'schedule': list(map(lambda schedule:
                         {
                             'id': schedule.id,
                             'startingDate': schedule.starting_date.strftime('%Y-%m-%d'),
                             'endingDate': schedule.ending_date.strftime('%Y-%m-%d'),
                             'startingTime': schedule.starting_time.strftime('%H:%M'),
                             'endingTime': schedule.ending_time.strftime('%H:%M'),
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
        return jsonify({'status': 'NG', 'message': 'date is not date'})
    datatime = t.datetime(year, month, day)
    schedules = schedule_db.get_daily_schedules(uid, datatime)
    result = list(map(lambda schedule:
                      {
                          "id": schedule.id,
                          "startingDate": schedule.starting_date.strftime('%Y-%m-%d'),
                          "endingDate": schedule.ending_date.strftime('%Y-%m-%d'),
                          "startingTime": schedule.starting_time.strftime('%H:%M'),
                          "endingTime": schedule.ending_time.strftime('%H:%M'),
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
        return jsonify({'status': 'NG', 'message': "deta is not json"})
    json: dict = cast(dict, request.get_json())

    error_message: str = ""

    for param in schedule_model.Schedule.get_date_param_name():
        json_key = convert_to_camel(param)
        if json_key not in json:
            error_message += f"{param} is not found\n"
            continue
        if not is_date_convertible(json[json_key]):
            error_message += f"{param} is not date\n"
            continue
        json[json_key] = t.datetime.strptime(json[json_key], '%Y-%m-%d')

    for param in schedule_model.Schedule.get_time_param_name():
        json_key = convert_to_camel(param)
        if json_key not in json:
            error_message += f"{param} is not found\n"
            continue
        if not is_time_convertible(json[json_key]):
            error_message += f"{param} is not time\n"
            continue
        json[json_key] = t.datetime.strptime(json[json_key], '%H:%M')

    if error_message != "":
        return jsonify({'status': 'NG', 'message': error_message})

    check, errors = schedule_model.validate(json)
    if not check:
        return jsonify({'status': 'NG', 'message': errors})
    
    if not "id" in json:
        return jsonify({'status': 'NG', 'message': "id is not found"})

    uid = json['uid']
    starting_date = json['startingDate']
    ending_date = json['endingDate']
    starting_time = json['startingTime']
    ending_time = json['endingTime']
    item = json['item']
    spending_amount = json['spendingAmount']
    income_amount = json['incomeAmount']
    schedule = schedule_model.Schedule(
        uid, starting_date, ending_date, starting_time, ending_time, item, spending_amount, income_amount)
    schedule.id = json["id"]
    schedule_db.change_schedule(schedule)
    return jsonify({'status': 'OK'})


