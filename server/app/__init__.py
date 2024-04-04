from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate  

from dotenv import load_dotenv
import os

from flask_sqlalchemy import SQLAlchemy

from flask_login import LoginManager

from flask_bcrypt import Bcrypt 

import boto3


app = Flask(__name__) 
CORS(app, supports_credentials=True)

bcrypt = Bcrypt(app)

load_dotenv() 
app.secret_key = os.getenv('FLASK_SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{os.getenv('MYSQL_USERNAME')}:{os.getenv('MYSQL_PASSWORD')}@localhost/meal_buildr_beta"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False



db = SQLAlchemy(app)
migrate = Migrate(app, db)

login_manager = LoginManager()
login_manager.init_app(app)


s3_client = boto3.client(
    's3', 
    aws_access_key_id = os.getenv('AWS_BUCKET_ACCESS_KEY'),
    aws_secret_access_key = os.getenv('AWS_BUCKET_SECRET_KEY'),
    region_name = 'us-east-2'
)



from app import models, authentication, views, aws