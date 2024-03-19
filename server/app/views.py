
from app import app 
from flask_login import login_required, current_user
from flask import jsonify, request
from app.models import User, Meal, Team, team_admins, team_athletes


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
        return jsonify({'message':'team not found'})


    if (userName == current_user.username 
        or team.team_id in [t.team_id for t in current_user.admin_teams] 
        or team.owner.user_id == current_user.user_id):
        targetUser = User.query.filter_by(username = userName).first()
        if targetUser is None:
            return jsonify({'message':'user not found'}), 404
        if targetUser.user_id in [u.user_id for u in team.athletes]:
            meals = [{'logged_at': meal.logged_at, 'description': meal.description}for meal in Meal.query.filter_by(user_id = targetUser.user_id)]
            #filter for date eventually 
            return jsonify({"message":"meal fetch was successful",
                            "listOfMeals": meals})
        else:
            return jsonify({'message':'user not found in team'}), 404

    else:   
        return jsonify({'message': 'Unauthorized'})
        
        
