from app import app, login_manager, db, bcrypt
from app.models import User
from flask import jsonify, request
from flask_login import login_user, login_required, logout_user, current_user


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/register', methods = ['POST'])
def register():
    ##receive form from client
    
    username = request.json.get('username')
    if (User.query.filter_by(username = username).first()):
        return jsonify({'message':'username is taken'})
    password = request.json.get('password')
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user = User(username = username, hashed_password = hashed_password)
    db.session.add(user)    
    db.session.commit()
    user = User.query.filter_by(username = username).first()
    login_user(user)

    return jsonify({'message': 'user registered successfully', 'username': f"{username}", 'password': password}), 201
    
@app.route('/login', methods = ['POST'])
def login(): 
    ##receive form from client
    username = request.json.get('username')
    password = request.json.get('password')

    user = User.query.filter_by(username = username).first()

    
    if user and bcrypt.check_password_hash(user.hashed_password, password): 

        login_user(user)
        
        return jsonify({'message': 'user logged in successfully', 'username': username, 'password': password}), 200
    else:
        return jsonify({'message': 'invalid credentials'}), 401
    

@app.route('/logout', methods = ['GET'])
def logout():
    logout_user()
    return jsonify({'message': 'successfully logged out'})