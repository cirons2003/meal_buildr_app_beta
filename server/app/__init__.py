from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate  

import os

from flask_sqlalchemy import SQLAlchemy

from flask_login import LoginManager

from flask_bcrypt import Bcrypt 

import boto3


app = Flask(__name__) 
CORS(app, supports_credentials=True, origins=['http://localhost:3000', 'https://meal-buildr-app-beta-client.onrender.com/'])

bcrypt = Bcrypt(app)

#uncomment for testing 
#from dotenv import load_dotenv
#load_dotenv() 

app.secret_key = os.getenv('FLASK_SECRET_KEY')
uri = os.getenv('DATABASE_URI_PRODUCTION') 
uri += '?sslmode=require'# uncomment for production 
app.config['SQLALCHEMY_DATABASE_URI'] = uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG'] = False #True for testing only 

app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'None'  




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

##returns app instance for deployment
def create_app():
    return app