
from app import app 
from flask_login import login_required, current_user
from flask import jsonify
from app.models import Team, team_admins, team_athletes


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