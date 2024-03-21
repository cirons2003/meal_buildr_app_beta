
from app import app 
from flask_login import login_required, current_user
from flask import jsonify, request
from app.models import User, Meal, Team, team_admins, team_athletes
from datetime import datetime



@app.route('/getUserTeams')
@login_required
def getUserTeams():
    owner_teams = Team.query.filter_by(owner_id = current_user.user_id).all()
    admin_teams = current_user.admin_teams
    athlete_teams = current_user.athlete_teams

    response = [{'role': 'owner', 'team_name': team.team_name} for team in owner_teams]
    response.extend([{'role': 'admin', 'team_name': team.team_name} for team in admin_teams])
    response.extend([{'role': 'athlete', 'team_name': team.team_name} for team in athlete_teams])

    return jsonify(response)

@app.route('/getMeals', methods = ['Post'])
@login_required
def getMeals():
    userName = request.json.get('username')
    teamName = request.json.get('teamName')
    team = Team.query.filter_by(team_name = teamName).first()

    if team is None:
        return jsonify({'message':'team not found'}), 404
    
    start = request.json.get('start')
    start = datetime.fromisoformat(start)
    start = start.replace(tzinfo = None)
    end = request.json.get('end')
    end = datetime.fromisoformat(end)
    end = end.replace(tzinfo = None)
    
    if not (isinstance(start, datetime) and isinstance(end, datetime)):
        return jsonify({'message': 'invalid date range'})


    if (userName == current_user.username 
        or team.team_id in [t.team_id for t in current_user.admin_teams] 
        or team.owner.user_id == current_user.user_id):
        targetUser = User.query.filter_by(username = userName).first()
        if targetUser is None:
            return jsonify({'message':'user not found'}), 404
        if targetUser.user_id in [u.user_id for u in team.athletes]:
            meals = [{'logged_at': meal.logged_at, 'description': meal.description}for meal in Meal.query.filter_by(user_id = targetUser.user_id)]
            #filter for date 
            meals = [meal for meal in meals if (meal['logged_at'] < end and meal['logged_at'] > start)]
            return jsonify({"message":"meal fetch was successful",
                            "listOfMeals": meals})
        else:
            return jsonify({'message':'user not found in team'}), 404

    else:   
        return jsonify({'message': 'Unauthorized'})
        
        
@app.route('/getListOfAthletes', methods = ['POST'])
@login_required
def getListOfAthletes():
    userName = request.json.get('username')
    teamName = request.json.get('team_name')    

    user = User.query.filter_by(username = userName).first()
    if user is None:
        return jsonify({'message': 'user not found'}), 404
    team = Team.query.filter_by(team_name = teamName).first()
    
    if team is None:
        return jsonify({'message': 'team not found'}), 404
    
    ##admin/owner access
    if (team.team_id in [t.id for t in user.admin_teams] 
        or team.owner_id == current_user.user_id):
        athletes = [{'username': a.username} for a in team.athletes]
        return jsonify({'listOfAthletes': athletes, 'message':'successful'})
    else:
        return jsonify({'message': 'Unauthorized'}), 404
    
