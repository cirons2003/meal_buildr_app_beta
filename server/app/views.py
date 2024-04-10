
from app import app 
from flask_login import login_required, current_user
from flask import jsonify, request
from app.models import User, Meal, Team, Comment, Message, Conversation, conversation_users, team_admins, team_athletes
from datetime import datetime
import pytz
from app import db 



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


#all dates are stored as utc in the database 
@app.route('/getMeals', methods = ['POST'])
@login_required
def getMeals():
    userName = request.json.get('username')
    teamName = request.json.get('teamName')
    team = Team.query.filter_by(team_name = teamName).first()

    if team is None:
        return jsonify({'message':'team not found'}), 404
    
    start = request.json.get('start')
    start = datetime.fromisoformat(start.replace('Z', '+00:00'))
    start = start.replace(tzinfo = pytz.UTC)
    end = request.json.get('end')
    end = datetime.fromisoformat(end.replace('Z', '+00:00'))
    end = end.replace(tzinfo = pytz.UTC)
    
    if not (isinstance(start, datetime) and isinstance(end, datetime)):
        return jsonify({'message': 'invalid date range'})


    if (userName == current_user.username 
        or team.team_id in [t.team_id for t in current_user.admin_teams] 
        or team.owner.user_id == current_user.user_id):
        targetUser = User.query.filter_by(username = userName).first()
        if targetUser is None:
            return jsonify({'message':'user not found'}), 404
        if targetUser.user_id in [u.user_id for u in team.athletes]:
            meals = [meal for meal in Meal.query.filter_by(user_id = targetUser.user_id)]
            #filter for date 
            meals = [meal for meal in meals if (meal.logged_at.replace(tzinfo = pytz.UTC) < end and meal.logged_at.replace(tzinfo = pytz.UTC) > start)]
            meals = [{'logged_at': meal.logged_at.isoformat() + 'Z', 'description': meal.description, 'meal_id': meal.meal_id, 'image_url': meal.image_url} for meal in meals]
            return jsonify({"message":("meal fetch was successful for date range: ", start, "until", end),
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
    if (team.team_id in [t.team_id for t in user.admin_teams] 
        or team.owner_id == current_user.user_id):
        athletes = [{'username': a.username} for a in team.athletes]
        return jsonify({'listOfAthletes': athletes, 'message':'successful'})
    else:
        return jsonify({'message': 'Unauthorized'}), 404
    

@app.route('/addComment', methods = ['POST'])
@login_required
def addComment():
    comment_text = request.json.get('comment_text')
    meal_id = request.json.get('meal_id')
    poster_id = current_user.user_id
    poster_username = current_user.username

    comment = Comment(comment_text = comment_text, meal_id = meal_id, poster_id = poster_id, poster_username = poster_username)
    db.session.add(comment)    
    db.session.commit()

    return jsonify({'message': 'comment posted!'})


@app.route('/getComments', methods = ['POST'])
@login_required
def getComments():
    meal_id = request.json.get('meal_id')
    meal = Meal.query.filter_by(meal_id = meal_id).first()

    if meal is None: 
        return jsonify({'message': 'meal not found'}), 404 
    
    ##low security version here... anybody can view all comments on a meal
    comments = Comment.query.filter_by(meal_id = meal.meal_id).all()
    comments = [{'comment_text': c.comment_text, 'poster_username': c.poster_username, 'commented_at':c.commented_at} for c in comments]
    return jsonify({'listOfComments': comments, 'message': 'comments fetched successfully'})

##sry for sloppiness :(
@app.route('/sendMessage', methods = ["POST"])
@login_required
def sendMessage():
    message_text = request.json.get('message_text')
    recipient_id = request.json.get('recipient_id')
    cid = request.json.get('conversation_id')

    if not message_text or (not recipient_id and not cid):
        return jsonify({'message': 'invalid arguments'}), 404

    convo = Conversation.query.get(cid)

####################################################################################################################
    #if no cid, then use recipient_id
    if convo is None: 
        ##ensure recipient is valid
        user = User.query.get(recipient_id)
        if user is None: 
            return jsonify({'message': 'recipient not found'}), 404
        
        ##find conversation with current and recipient
        ##
        ##check if recipient = current 
        if recipient_id == current_user.user_id:
            # Look for a conversation where the current user is the only participant
            participant_count_subquery = (db.session.query(conversation_users.c.conversation_id, db.func.count().label('participant_count'))
                                        .group_by(conversation_users.c.conversation_id)
                                        .subquery())

            # Query to find a conversation where the current user is the only participant
            conversation = (Conversation.query
                            .join(conversation_users, Conversation.conversation_id == conversation_users.c.conversation_id)
                            .join(participant_count_subquery, Conversation.conversation_id == participant_count_subquery.c.conversation_id)
                            .filter(conversation_users.c.user_id == recipient_id,
                                    participant_count_subquery.c.participant_count == 1)
                            .first())
        else:
            # Handle the case where the user is sending a message to another user
            conversation = (Conversation.query
                            .join(conversation_users, Conversation.conversation_id == conversation_users.c.conversation_id)
                            .filter(conversation_users.c.user_id.in_([current_user.user_id, recipient_id]))
                            .group_by(Conversation.conversation_id)
                            .having(db.func.count() == 2)  # Conversations with both participants
                            .first())
        ##at this point we've grabbed the convo or have no convo existing  
        ##create new convo if needed 
        if conversation is None:
            convo = Conversation(last_message_text = message_text)
            db.session.add(convo)
            db.session.commit()
            cid = convo.conversation_id
            db.session.execute(conversation_users.insert().values(conversation_id=cid, user_id=current_user.user_id))
            if (recipient_id != current_user.user_id):
                db.session.execute(conversation_users.insert().values(conversation_id=cid, user_id=recipient_id))
        ##update old convo otherwise
        else: 
            cid = conversation.conversation_id
            conversation.last_message_text = message_text  
#########################################################################################################################      
    ##this means we should use cid instead 
    else: 
        if len(convo.users.all()) == 1 and current_user in convo.users:
            recipient_id = current_user.user_id
        else:
            recipient_id = next((user.user_id for user in convo.users if user.user_id != current_user.user_id), None)
        user = User.query.get(recipient_id)
        convo.last_message_text = message_text
        convo.last_used_at = datetime.utcnow()
###################################################################################################################
    ##at this point 
    message = Message(message_text = message_text, sender_id = current_user.user_id, sender_username = current_user.username, recipient_id = recipient_id, recipient_username = user.username , conversation_id = cid)

    db.session.add(message)    
    db.session.commit()

    return jsonify({'message': f'message sent to {recipient_id}', 'conversation_id': cid})



@app.route('/getMessages', methods = ['POST'])
@login_required
def getMessages():
    conversation_id = request.json.get('conversation_id')

    convo = Conversation.query.get(conversation_id)

    if convo is None:
        return jsonify({'message': 'cannot find conversation'})
    
    if (not (current_user.user_id in [u.user_id for u in convo.users])):
        return jsonify({'message': 'unauthorized'})
    
    messages = convo.messages.order_by(db.asc(Message.sent_at))
    
    messages = [{'message_text': m.message_text,
                'sender_username': m.sender_username,
                'recipient_username': m.recipient_username,
                'sent_at': m.sent_at} for m in messages]
    return jsonify({'listOfMessages': messages, 'message': 'messages fetched successfully'})



@app.route('/getConversations', methods = ['GET'])
@login_required
def getConversations():
    conversations = (Conversation.query.join(conversation_users, Conversation.conversation_id == conversation_users.c.conversation_id)
                     .filter(conversation_users.c.user_id == current_user.user_id)
                     .order_by(db.desc(Conversation.last_used_at)).all())
    
    conversations = [{'last_used_at': c.last_used_at,
                       'last_message_text': c.last_message_text,
                         'other_user_id': next((user.user_id for user in c.users if user.user_id != current_user.user_id), None),
                         'other_user_username': next((user.username for user in c.users if user.user_id != current_user.user_id), current_user.username),
                         'conversation_id': c.conversation_id} for c in conversations]
    
    return jsonify({'listOfConversations': conversations, 'message': 'successfully fetched conversations'})



@app.route('/getTeamMembers', methods = ['POST'])
@login_required
def getTeamMembers():
    team_name = request.json.get('team_name')
    
    team = Team.query.filter_by(team_name = team_name).first()
    if team is None: 
        return jsonify({'message': 'user not found'}), 404

    owner = User.query.filter_by(user_id = team.owner_id).first()
    admins = team.admins
    athletes = team.athletes

    owner = {'username': owner.username, 'user_id': owner.user_id, 'role': 'owner'}
    admins = [{'username': a.username, 'user_id': a.user_id, 'role': 'admin'} for a in admins]
    athletes = [{'username': a.username, 'user_id': a.user_id, 'role': 'athlete'} for a in athletes]
    
    
    return jsonify({'owner': owner, 'admins': admins, 'athletes': athletes, 'message': 'successfully fetched team members'})


