
import flask

import api.schedule_api as schedule_api
from model.tables import create_all_tables

create_all_tables()


app = flask.Flask(__name__)


@app.route('/')
def index():
    return 'Hello World!'


app.register_blueprint(schedule_api.schedule_module)

if __name__ == '__main__':
    app.run()
