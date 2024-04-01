from app import db
from datetime import datetime 
from flask_login import UserMixin



team_admins = db.Table(
    'team_admins',
    db.Column('team_id', db.Integer, db.ForeignKey('team.team_id'), primary_key = True),
    db.Column('user_id', db.Integer, db.ForeignKey('user.user_id'), primary_key = True)
)

team_athletes = db.Table(
    'team_athletes',
    db.Column('team_id', db.Integer, db.ForeignKey('team.team_id'), primary_key = True),
    db.Column('user_id', db.Integer, db.ForeignKey('user.user_id'), primary_key = True)
)

class User(db.Model, UserMixin): 
    user_id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(20), index = True, unique = True, nullable = False)
    hashed_password = db.Column(db.String(128), nullable = False)
    join_date = db.Column(db.DateTime, default = db.func.now(), nullable = False)
    account_type = db.Column(db.String(35), default = "standard", nullable = False)     
    profile_picture_url = db.Column( db.String(128))
    meals = db.relationship('Meal', cascade = 'all, delete-orphan', backref = 'user', lazy = 'dynamic')
    owned_teams = db.relationship('Team', backref = db.backref('owner', uselist = False) )
    admin_teams = db.relationship('Team', secondary = team_admins, backref = db.backref('admins_', lazy = 'dynamic'))
    athlete_teams = db.relationship('Team', secondary = team_athletes, backref = db.backref('athletes_', lazy = 'dynamic'))

    def get_id(self): 
        return str(self.user_id)
    
class Meal(db.Model):
    meal_id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable = False)
    logged_at = db.Column(db.DateTime, default = db.func.now(), nullable = False)
    description = db.Column(db.String(500))
    image_url = db.Column(db.String(128))
    

class Team(db.Model):
    team_id = db.Column(db.Integer, primary_key = True)
    team_name = db.Column(db.String(20), nullable = False, unique = True)
    capacity = db.Column(db.Integer, nullable = False)
    num_athletes = db.Column(db.Integer, nullable = False, default = 0)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable = False)
    created_at = db.Column(db.DateTime, default = db.func.now(), nullable = False,) 
    admins = db.relationship('User', secondary = team_admins, backref = db.backref('admin_of_teams', lazy = 'dynamic'))
    athletes = db.relationship('User', secondary = team_athletes, backref = db.backref('athlete_of_teams', lazy = 'dynamic'))


    
class Comment(db.Model):
    comment_id = db.Column(db.Integer, primary_key = True)
    poster_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable = False)
    poster_username = db.Column(db.String(50), nullable = False)
    meal_id = db.Column(db.Integer, db.ForeignKey('meal.meal_id'), nullable = False)
    comment_text = db.Column(db.String(500), nullable = False)
    commented_at = db.Column(db.DateTime, default = db.func.now(), nullable = False)

class Message(db.Model):
    message_id = db.Column(db.Integer, primary_key = True) 
    sender_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable = False)
    sender_username = db.Column(db.String(50), nullable = False)
    recipient_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable = False)
    recipient_username = db.Column(db.String(50), nullable = False)
    message_text = db.Column(db.String(500), nullable = False)
    sent_at = db.Column(db.DateTime, default = datetime.utcnow, nullable = False)
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversation.conversation_id'), nullable = False)


class Conversation(db.Model): 
    conversation_id = db.Column(db.Integer, primary_key = True)
    messages = db.relationship('Message', cascade='all, delete-orphan', backref='conversation', lazy='dynamic', foreign_keys='Message.conversation_id')
    last_used_at = db.Column(db.DateTime, default = db.func.now(), nullable = False)
    users = db.relationship('User', secondary = 'conversation_users', lazy = 'dynamic')
    last_message_text = db.Column(db.String(500), nullable = False)

conversation_users = db.Table(
    'conversation_users', db.Column('conversation_id', db.Integer, db.ForeignKey('conversation.conversation_id', ondelete='CASCADE'), primary_key = True),
    db.Column('user_id', db.Integer, db.ForeignKey('user.user_id', ondelete='CASCADE'), primary_key = True),
    db.Column('joined_at', db.DateTime, default = db.func.now(), nullable = False)
)   