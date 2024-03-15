
from app import app 
from flask_login import login_required, current_user
from flask import jsonify



@app.route('/test')
def test():
    if (current_user.is_authenticated):
        return jsonify({"message": "user logged in "})
    return jsonify({"message": "test success"})

@app.route('/secret')
@login_required
def secret():
    return jsonify({'message':'secret message'})