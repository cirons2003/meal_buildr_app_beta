from app import db
from datetime import datetime 
from flask_login import UserMixin

class User(db.Model, UserMixin): 
    user_id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(20), index = True, unique = True, nullable = False)
    hashed_password = db.Column(db.String(128), nullable = False)
    join_date = db.Column(db.DateTime, default = datetime.utcnow, nullable = False)
    account_type = db.Column(db.String(35), default = "standard", nullable = False)

    def get_id(self): 
        return str(self.user_id)