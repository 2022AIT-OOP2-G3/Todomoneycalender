import datetime as t
from typing import cast

from flask import Blueprint, jsonify, request

import db.schedule_db as schedule_db
import model.schedule_model as schedule_model
from utility.is_date_convertible import (is_date_convertible,
                                         is_time_convertible)

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
    if not is_date_convertible(json['date']):
        error_message += "date is not date\n"
    if not is_time_convertible(json['startingTime']):
        error_message += "starting_time is not time\n"
    if not is_time_convertible(json['endingTime']):
        error_message += "ending_time is not time\n"
    if error_message != "":
        return jsonify({'status': 'NG', 'message': error_message})

    json['date'] = t.datetime.strptime(json['date'], '%Y-%m-%d')
    json['startingTime'] = t.datetime.strptime(json['startingTime'], '%H:%M')
    json['endingTime'] = t.datetime.strptime(json['endingTime'], '%H:%M')
    check, errors = schedule_model.validate(json)
    if not check:
        return jsonify({'status': 'NG', 'message': errors})

    uid = json['uid']
    date = json['date']
    starting_time = json['startingTime']
    ending_time = json['endingTime']
    item = json['item']
    spending_amount = json['spendingAmount']
    income_amount = json['incomeAmount']
    schedule_db.add_schedule(uid, date, starting_time,
                             ending_time, item, spending_amount, income_amount)
    return jsonify({'status': 'OK'})


@ schedule_module.route('/<string:uid>/<int:year>/<int:month>', methods=['GET'])
def get_monthly_schedules(uid: str, year: int, month: int):
    """指定した月のスケジュールを取得する

    Args:
        uid (str): ユーザーID
        year (int): 年
        month (int): 月

    Returns:
        List[Schedule]: スケジュールのリスト
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
        'date': datatime.strftime('%Y-%m'),
        'spendingAmount': total_spending_amount,
        'usingAmount': total_using_amount,
        'incomeAmount': total_income_amount,
        'schedule': list(map(lambda schedule:
                         {
                             'date': schedule.date.strftime('%Y-%m-%d'),
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

    Returns:
        List[Schedule]: スケジュールのリスト
    """

    if not is_date_convertible(f'{year}-{month}-{day}'):
        return jsonify({'status': 'NG', 'message': 'date is not date'})
    datatime = t.datetime(year, month, day)
    schedules = schedule_db.get_daily_schedules(uid, datatime)
    result = list(map(lambda schedule:
                      {
                          "startingDate": schedule.date.strftime('%Y-%m-%d'),
                          "endingDate": schedule.date.strftime('%Y-%m-%d'),
                          "startingTime": schedule.starting_time.strftime('%H:%M'),
                          "endingTime": schedule.ending_time.strftime('%H:%M'),
                          "item": schedule.item,
                          "spendingAmoun": schedule.spending_amount,
                          "incomeAmount": schedule.income_amount,
                      },
                      schedules
                      ))
    return jsonify(result)
