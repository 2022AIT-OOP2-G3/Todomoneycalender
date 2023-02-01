import logging
import os
from logging.config import dictConfig

import flask
from dotenv import load_dotenv
from flask import Flask, has_request_context, request
from flask.logging import default_handler
from flask_cors import CORS
from sqlalchemy.engine.create import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker
from firebase_admin import initialize_app, credentials

from typing import cast

"""
firebaseの設定
"""

path = os.path.join(os.path.dirname(__file__), '../firebase.json')
cred = credentials.Certificate(path)
initialize_app(cred)

"""
サーバーの設定
"""

app = flask.Flask(__name__)
CORS(app)
app.config['JSON_SORT_KEYS'] = False
app.config['JSON_AS_ASCII'] = False
app.config['ENABLE_AUTH'] = False

"""
データベースの設定
"""

# 2023-01-11T00:00
date_time_format = '%Y-%m-%dT%H:%M'
date_format = '%Y-%m-%d'
manth_format = '%Y-%m'

# read dev.env file
load_dotenv(dotenv_path="../.env.dev")

user = os.environ.get("MYSQL_USER")
password = os.environ.get("MYSQL_PASSWORD")
host = os.environ.get("HOST")
db_name = os.environ.get("MYSQL_DATABASE")

url: str = f'mysql+mysqlconnector://{user}:{password}@{host}/{db_name}'

# engineの設定
engine = create_engine(url=url, pool_recycle=10)

session = scoped_session(
    sessionmaker(
        autocommit=False,
        autoflush=False,
        bind=engine
    )
)

base = declarative_base()
base.query = session.query_property()


def get_db_session() -> scoped_session:
    return session()  # type: ignore


def get_db_engine():
    return engine


def get_db_base():
    return base
