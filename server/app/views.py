
from app import app 
from flask_login import login_required, current_user
from flask import jsonify, request
from app.models import User, Meal, Team, Comment, Message, Conversation, Notification, conversation_users, team_admins, team_athletes
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


#Get Athlete Info 
@app.route('/getAthleteInfo', methods = ['POST'])
@login_required
def getAthleteInfo():
    athlete_name = request.json.get(athlete_name)
    team_name = request.json.get(team_name)
    athlete = User.query.filter_by(username = athlete_name).first()
    if (athlete is None): 
        return jsonify({'message': 'cannot find athlete'}), 401
    team = Team.query.filter_by(team_name = team_name).first()
    if (team is None): 
        return jsonify({'message': 'cannot find team'}), 401

    if (not((current_user.user_id in [u.user_id for u in team.admins]) or (team.owner_id != current_user.user_id))):
        return jsonify({'message': 'unauthorized to access athlete info'})

    return jsonify({'message': 'successfully fetched athlete info', 'athlete': {}})


##change user role in team 
@app.route('/changeUserRole', methods = ["POST"])
@login_required
def changeUserRole():
    athlete_name = request.json.get('athlete_name')
    to_role = request.json.get('to_role')
    team_name = request.json.get('team_name')
    athlete = User.query.filter_by(username = athlete_name).first()
    if (athlete is None): 
        return jsonify({'message': 'cannot find athlete', 'status': 'error'}), 401
    team = Team.query.filter_by(team_name = team_name).first()
    if (team is None): 
        return jsonify({'message': 'cannot find team'}), 401
    if (team.owner_id != current_user.user_id):
        return jsonify({'message': 'Must be an owner to edit roles', 'status': 'error'})
    
    if to_role == 'admin':
        if athlete not in team.admins:
            team.admins.append(athlete)
            if athlete in team.athletes:
                team.athletes.remove(athlete)
            db.session.commit()
            return jsonify({'message': 'Athlete added as admin', 'status': 'success'}), 200
        else:
            return jsonify({'message': 'Athlete is already an admin', 'status': 'error'}), 409
    elif to_role == 'athlete':
        if athlete not in team.athletes:
            team.athletes.append(athlete)
            if athlete in team.admins:
                team.admins.remove(athlete)
            db.session.commit()
            return jsonify({'message': 'Athlete added as team member', 'status': 'success'}), 200
        else:
            return jsonify({'message': 'Athlete is already a team member', 'status': 'error'}), 409
    else:
        return jsonify({'message': 'Invalid role specified'}), 400
    
@app.route('/getTeamMemberContext', methods = ['POST'])
@login_required
def gerRole():
    username = request.json.get('username')
    teamg_name = request.json.get('team_name')

    user = User.query.filter_by(username = username).first()
    if (user is None): 
        return jsonify({'message': 'cannot find user'}), 401
    team = Team.query.filter_by(team_name = team_name).first()
    if (team is None): 
        return jsonify({'message': 'cannot find team'}), 401
    
    ## get role 
    if (user in team.admins):
        role = 'admin'
    elif (user in team.athletes):
        role = 'athlete'
    else: 
        role = 'none'

    return jsonify({'message': 'successfully fetched team info', 'info': {'role': role, 'user_id': user.user_id}})

    ##finish
@app.route('/getUserInfo', methods = ['POST'])
@login_required
def getUserInfo():
    username = request.json.get('username')
    if (username):
        c = User.query.filter_by(username = username).first()
    else:
        c = current_user
    userInfo = {'user_id': c.user_id, 'username': c.username, 'first_name': c.first_name, 'last_name': c.last_name, 'bio': c.bio, 'profile_picture_url': c.profile_picture_url}

    return jsonify({'message': f'successfully fetched user data', 'user': userInfo})




#finish
@app.route('/changeUserInfo', methods = ['POST'])
@login_required
def changeUserInfo(): 
    ##newUsername = request.json.get('newUsername') ##not yet 
    newFirstName = request.json.get('newFirstName')
    newLastName = request.json.get('newLastName')
    newBio = request.json.get('newBio')
    newProfilePictureURL = None # request.json.get('newProfilePictureURL') ##not yet
     
    if newFirstName:
        current_user.first_name = newFirstName
    if newLastName:
        current_user.last_name = newLastName
    if newBio:
        current_user.bio = newBio
    
    
    db.session.commit()
    return jsonify({'message': 'successfully updated profile' })
    
    
    

    
    
@app.route('/removeUserFromTeam', methods = ["POST"])
@login_required
def removeUserFromTeam():
    username = request.json.get('username')
    team_name = request.json.get('team_name')

    user = User.query.filter_by(username = username).first()
    if (user is None): 
        return jsonify({'message': 'cannot find user'}), 401
    team = Team.query.filter_by(team_name = team_name).first()
    if (team is None): 
        return jsonify({'message': 'cannot find team'}), 401
    
    ##check authorization
    if (team.owner_id != current_user.user_id):
        return jsonify({'message': 'Must be an owner to edit roles', 'status': 'error'})
    
    if (user in team.athletes):
        team.athletes.remove(user)
    if (user in team.admins):
        team.admins.remove(user)
    
    db.session.commit()

    return jsonify({'message': ('successfully removed',username,' from ', team_name)} )


    



#all dates are stored as utc in the database 
@app.route('/getMeals', methods = ['POST'])
@login_required
def getMeals():
    userName = request.json.get('username')
    teamName = request.json.get('teamName')
    team = Team.query.filter_by(team_name = teamName).first()

    if team is None and teamName != 'none': 
        return jsonify({'message':'team not found'}), 404
    
    start = request.json.get('start')
    start = datetime.fromisoformat(start.replace('Z', '+00:00'))
    start = start.replace(tzinfo = pytz.UTC)
    end = request.json.get('end')
    end = datetime.fromisoformat(end.replace('Z', '+00:00'))
    end = end.replace(tzinfo = pytz.UTC)
    
    if not (isinstance(start, datetime) and isinstance(end, datetime)):
        return jsonify({'message': 'invalid date range'})


    if (userName == current_user.username or (team and (
        team.team_id in [t.team_id for t in current_user.admin_teams] 
        or team.owner.user_id == current_user.user_id))):
        targetUser = User.query.filter_by(username = userName).first()
        if targetUser is None:
            return jsonify({'message':'user not found'}), 404
        if (userName == current_user.username or targetUser.user_id in [u.user_id for u in team.athletes]):
            meals = [meal for meal in Meal.query.filter_by(user_id = targetUser.user_id)]
            #filter for date 
            meals = [meal for meal in meals if (meal.logged_at.replace(tzinfo = pytz.UTC) < end and meal.logged_at.replace(tzinfo = pytz.UTC) > start)]
            meals = [{'meal_id': meal.meal_id,'logged_at': meal.logged_at.isoformat() + 'Z', 'description': meal.description, 'meal_id': meal.meal_id, 'image_url': meal.image_url} for meal in meals]
            return jsonify({"message":("meal fetch was successful for date range: ", start, "until", end),
                            "listOfMeals": meals})
        else:
            return jsonify({'message':'user not found in team'}), 404

    else:   
        return jsonify({'message': f'{userName} is Unauthorized'})

        
        
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
        athletes = [{'username': a.username, 'first_name':a.first_name, 'last_name':a.last_name, 'profile_picture_url': a.profile_picture_url} for a in team.athletes]
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

    meal = Meal.query.filter_by(meal_id = meal_id).first()
    if (meal is None):
        return jsonify({'message': 'meal not found'}), 404

    #notification
    if (current_user.user_id != meal.user_id):
        meal_owner = User.query.filter_by(user_id = meal.user_id).first()
        if (meal_owner is None): 
            return jsonify({'message':'meal has no owner'}), 404

        if (current_user.first_name and current_user.last_name):
            fromTag = f"{current_user.first_name} {current_user.last_name}"
        else:
            fromTag = f"{current_user.username}"
        header = f"{fromTag} commented on your meal!"
        body = 'Click here to see what they said...'
        notification = Notification(header = header, body = body, user_id = meal_owner.user_id, variant = 'comment', meal_username = meal_owner.username, meal_id = meal_id, meal_logged_at =meal.logged_at.strftime('%Y-%m-%d %H:%M:%S'))   
        db.session.add(notification)

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
    
    comments = db.session.query(Comment.comment_text, Comment.poster_username, User.profile_picture_url, Comment.commented_at)\
        .join(User, User.username == Comment.poster_username)\
        .filter(Comment.meal_id == meal_id).all()   
    comments = [{'comment_text': c[0], 'poster_username': c[1], 
                 'poster_profile_picture_url': c[2], 'commented_at':c[3].isoformat()+'Z'} for c in comments]
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
            if (message_text == 'doNotSendMessage'):
                return jsonify({'message':'no existing conversation', 'conversation_id': -1})
            convo = Conversation(last_message_text = message_text, last_message_sender_username= current_user.username)
            db.session.add(convo)
            db.session.commit()
            cid = convo.conversation_id
            db.session.execute(conversation_users.insert().values(conversation_id=cid, user_id=current_user.user_id))
            if (recipient_id != current_user.user_id):
                db.session.execute(conversation_users.insert().values(conversation_id=cid, user_id=recipient_id))
        ##update old convo otherwise
        else: 
            cid = conversation.conversation_id
            if (not(message_text == 'doNotSendMessage')):
                conversation.last_message_text = message_text 
                conversation.last_message_sender_username = current_user.username 
                conversation.unread_message = True
                conversation.last_used_at = datetime.utcnow()
                db.session.commit()
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
        convo.last_message_sender_username = current_user.username
        convo.unread_message = True
###################################################################################################################
    ##at this point 
    if (message_text != 'doNotSendMessage'):
        message = Message(message_text = message_text, sender_id = current_user.user_id, sender_username = current_user.username, recipient_id = recipient_id, recipient_username = user.username , conversation_id = cid)
        
        if (current_user.first_name and current_user.last_name):
            fromTag = f"{current_user.first_name} {current_user.last_name}"
        else:
            fromTag = f"{current_user.username}"
        header = f'New Message from {fromTag}'
        body = 'Click here to see what they said...'
        notification = Notification(header = header, body = body, user_id = user.user_id, variant = 'message', cid = cid)

        db.session.add(message)    
        db.session.add(notification)
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
    
    

    conversations = [{'last_used_at': c.last_used_at.isoformat() + 'Z',
                       'last_message_text': c.last_message_text,
                         'other_user_id': next((user.user_id for user in c.users if user.user_id != current_user.user_id), None),
                         'other_user_username': next((user.username for user in c.users if user.user_id != current_user.user_id), current_user.username),
                         'other_user_profile_picture_url': next((user.profile_picture_url for user in c.users if user.user_id != current_user.user_id), current_user.profile_picture_url),
                         'other_first_name': next((user.first_name for user in c.users if user.user_id != current_user.user_id), current_user.first_name),
                         'other_last_name': next((user.last_name for user in c.users if user.user_id != current_user.user_id), current_user.last_name),
                         'conversation_id': c.conversation_id,
                         'unread_message': (c.unread_message and current_user.username != c.last_message_sender_username),
                         'seen': (not(c.unread_message) and current_user.username == c.last_message_sender_username)} for c in conversations]

    
    
    return jsonify({'listOfConversations': conversations, 'message': 'successfully fetched conversations'})



@app.route('/getTeamMembers', methods = ['POST'])
@login_required
def getTeamMembers():
    team_name = request.json.get('team_name')
    
    team = Team.query.filter_by(team_name = team_name).first()
    if team is None: 
        return jsonify({'message': 'team not found'}), 404

    owner = User.query.filter_by(user_id = team.owner_id).first()
    admins = team.admins
    athletes = team.athletes

    owner = {'username': owner.username, 'first_name': owner.first_name, 'last_name':owner.last_name, 'user_id': owner.user_id, 'role': 'owner'}
    admins = [{'username': a.username, 'first_name': a.first_name, 'last_name': a.last_name, 'user_id': a.user_id, 'role': 'admin'} for a in admins]
    athletes = [{'username': a.username, 'first_name': a.first_name, 'last_name': a.last_name, 'user_id': a.user_id, 'role': 'athlete'} for a in athletes]
    
    
    return jsonify({'owner': owner, 'admins': admins, 'athletes': athletes, 'message': 'successfully fetched team members'})


@app.route('/changeTeamCode', methods = ['POST'])
@login_required
def changeTeamCode():
    team_name = request.json('team_name')
    join_code = request.json('join_code')

    team = Team.query.filter_by(team_name = team_name).first()

    if team is None: 
        return jsonify({'message': 'team not found'}), 404

    if (team.owner_id != current_user.user_id):
        return jsonify({'message':'Must be owner to change join code'}), 401
    
    team.join_code = join_code

    db.session.commit()
    return jsonify({'message': 'successfully changed join code!'}), 201
    


@app.route('/getTeamCode', methods = ['POST'])
@login_required
def getTeamCode():
    team_name = request.json.get('team_code')

    team = Team.query.filter_by(team_name = team_name).first()

    if team is None: 
        return jsonify({'message': 'team not found'}), 404

    if (team.owner_id != current_user.user_id):
        return jsonify({'message':'Must be owner to change join code'}), 401
    
    return jsonify({'message': 'successfully retrieved join code', 'join_code': team.join_code})


@app.route('/getTeamWithCode', methods = ['POST'])
@login_required
def getTeamWithCode():
    team_code = request.json.get('team_code')

    team = Team.query.filter_by(join_code = team_code).first()

    if team is None: 
        return jsonify({'message': 'no teams match given code', 'team': None})

    return jsonify({'message':'successfully returned matching team', 'team': {'team_name':team.team_name}})



@app.route('/joinTeamWithCode', methods = ['POST'])
@login_required
def joinTeamWithCode():
    team_name = request.json.get('team_name')
    team_code = int(request.json.get('team_code'))
    

    team = Team.query.filter_by(team_name = team_name).first()

    if team is None: 
        return jsonify({'message': 'team not found'}), 404

    if (team.join_code != team_code):
        return jsonify({'message': f'{team_code} is invalid code for {team.team_name}'})

    if ((team.team_id in [t.team_id for t in current_user.athlete_teams]) or (team.team_id in [t.team_id for t in current_user.admin_teams]) or (team.team_id in [t.team_id for t in current_user.owned_teams])):
        return jsonify({'message': 'user already in team'})
    
    new_row = team_athletes.insert().values(user_id = current_user.user_id, team_id = team.team_id)
    db.session.execute(new_row)
    db.session.commit()

    return jsonify({'message': 'successfully joined team!'}), 201

@app.route('/getNotifications')
@login_required
def getNotifications():
    notifications = Notification.query.filter_by(user_id = current_user.user_id).all()

    notifications = [{
                'notification_id': n.notification_id,
                'header': n.header,
                'body': n.body,
                'is_new': n.is_new,
                'timestamp': n.timestamp.isoformat() + 'Z',  # Convert datetime to string for JSON compatibility
                'user_id': n.user_id,
                'variant': n.variant,
                'cid': n.cid,  # This will be None if not related to a message
                'meal_username': n.meal_username,  # This will be None if not related to a meal comment
                'meal_id': n.meal_id,
                'meal_logged_at': n.meal_logged_at.isoformat()+'Z' if n.meal_logged_at else None}  for n in notifications]

    return jsonify({'message': 'successfully fetched notifications', 'listOfNotifications': notifications}) 

@app.route('/resolveNotification', methods = ['POST'])
@login_required
def resolveNotification():
    notification_id = request.json.get('notification_id')
    
    notification = Notification.query.filter_by(notification_id = notification_id).first()
    if (notification is None): 
        return jsonify({'message': 'notification not found'}), 404
    
    notification.is_new = False
        
    db.session.commit()


@app.route('/resolveMessages', methods = ['POST'])
@login_required
def resolveMessage():
    conversation_id = request.json.get('conversation_id')
    
    convo = Conversation.query.filter_by(conversation_id = conversation_id).first()
    if (convo is None): 
        return jsonify({'message': 'no conversation found'}), 404 
    ##only proceed if recipient views
    if (convo.last_message_sender_username == current_user.username and convo.users.count() > 1):
        return jsonify({'message':'no notifications to clear'})
    convo.unread_message = False

    notifs = Notification.query.filter_by(cid = conversation_id).all()

    for n in notifs: 
        n.is_new = False

    db.session.commit()

    return jsonify({'message':'successfully resolved new message'})


    
@app.route('/resolveComments', methods = ['POST'])
@login_required
def resolveComments():
    meal_id = request.json.get('meal_id')
    
    meal = Meal.query.filter_by(meal_id = meal_id).first()
    if (meal is None): 
        return jsonify({'message': 'no meal found'}), 404 
    ##only proceed if recipient views
    if (meal.user_id != current_user.user_id):
        return jsonify({'message':'no comments to clear'})
    

    notifs = Notification.query.filter_by(meal_id = meal_id).all()

    for n in notifs: 
        n.is_new = False

    db.session.commit()

    return jsonify({'message':'successfully resolved new message'})
    
