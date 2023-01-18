import model.schedule_model as scheduleModel

import model.payment_model as paymentModel

def create_all_tables():
    # 新しいテーブルを作成する場合はここに追加する
    scheduleModel.create_table()
    
    paymentModel.create_table()
