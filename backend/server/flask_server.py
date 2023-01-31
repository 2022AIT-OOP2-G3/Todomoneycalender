import api.payment_api as payment_api
import api.schedule_api as schedule_api
from model.tables import create_all_tables
from settings import app

create_all_tables()

app.register_blueprint(schedule_api.schedule_module)
app.register_blueprint(payment_api.payment_module)

if __name__ == '__main__':
    app.run(debug=True)
