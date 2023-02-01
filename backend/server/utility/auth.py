from functools import wraps
from flask import request, jsonify
from firebase_admin import auth
from settings import app


def valify_token(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if app.config['ENABLE_AUTH'] is False:
            return func(*args, **kwargs)
        token = request.headers.get('Authorization')
        if token is None:
            return jsonify({'status': 'NG', 'message': 'token is not found'})
        token = token.replace('JWT ', '')
        if not auth.verify_id_token(token):
            return jsonify({'status': 'NG', 'message': 'invalid token'})
        id = auth.verify_id_token(token)['uid']
        if id in request.url:
            return func(*args, **kwargs)
        json = request.get_json()
        if json is None:
            return jsonify({'status': 'NG', 'message': 'data is not json'})
        if not 'uid' in json or json['uid'] != id:
            return jsonify({'status': 'NG', 'message': 'invalid token'})
        return func(*args, **kwargs)
    return wrapper
