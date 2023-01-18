import flask
from flask_cors import CORS

import api.schedule_api as schedule_api
import api.payment_api as payment_api
from model.tables import create_all_tables

create_all_tables()


app = flask.Flask(__name__)
CORS(app)
app.config['JSON_SORT_KEYS'] = False

app.register_blueprint(schedule_api.schedule_module)
app.register_blueprint(payment_api.payment_module)

if __name__ == '__main__':
    app.run(debug=True)
