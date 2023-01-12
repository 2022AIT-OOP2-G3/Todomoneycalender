import datetime


def is_date_convertible(date: str) -> bool:
    """日付に変更することができるか検証を行う

        Args:
            data(str): 日付のデータ(%Y-%m-%d)

        Returns:
            bool: 日付に変更することができるか
    """
    try:
        datetime.datetime.strptime(date, '%Y-%m-%d')
        return True
    except ValueError:
        return False


def is_time_convertible(time: str) -> bool:
    """時間に変更することができるか検証を行う

        Args:
            data(str): 時間のデータ(%H:%M)

        Returns:
            bool: 時間に変更することができるか
    """
    try:
        datetime.datetime.strptime(time, '%H:%M')
        return True
    except ValueError:
        return False
