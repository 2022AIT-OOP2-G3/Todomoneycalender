import datetime


def is_date_convertible(date: str) -> bool:
    try:
        datetime.datetime.strptime(date, '%Y-%m-%d')
        return True
    except ValueError:
        return False


def is_time_convertible(time: str) -> bool:
    try:
        datetime.datetime.strptime(time, '%H:%M')
        return True
    except ValueError:
        return False
