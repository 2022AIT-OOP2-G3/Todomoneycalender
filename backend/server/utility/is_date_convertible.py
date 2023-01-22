import datetime
from settings import date_time_format, manth_format, date_format


def is_manth_convertible(date: str) -> bool:
    """月に変更することができるか検証を行う

        Args:
            data(str): 月のデータ(%Y-%m)

        Returns:
            bool: 月に変更することができるか
    """
    try:
        datetime.datetime.strptime(date, manth_format)
        return True
    except ValueError:
        return False


def is_date_convertible(date: str) -> bool:
    """日付に変更することができるか検証を行う

        Args:
            data(str): 日付のデータ(%Y-%m-%d)

        Returns:
            bool: 日付に変更することができるか
    """
    try:
        datetime.datetime.strptime(date, date_format)
        return True
    except ValueError:
        return False


def is_date_time_convertible(time: str) -> bool:
    """時間に変更することができるか検証を行う

        Args:
            data(str): 時間のデータ(%Y-%m-%dT%H:%M)

        Returns:
            bool: 時間に変更することができるか
    """
    try:
        datetime.datetime.strptime(time, date_time_format)
        return True
    except ValueError:
        return False
