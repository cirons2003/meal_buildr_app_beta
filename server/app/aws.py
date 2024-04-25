


from app import app, s3_client
from werkzeug.utils import secure_filename
from flask_login import login_required, current_user
from flask import request, jsonify
from app.models import Meal
from app import db 
from datetime import datetime


@app.route('/uploadMeal', methods = ['POST'])
@login_required
def uploadMeal(): 
    file = request.files['image']
    if file is None: 
        return jsonify({'message': 'expected image'}), 404
    filename = secure_filename(file.filename)
    if (filename == 'SERVERFILL'):
        filename = f"{current_user.username}_{datetime.now().strftime('%Y%m%d%H%M%S')}.jpg"
    bucket_name = 'mealbuildr-bucket'

    try:
        s3_client.upload_fileobj(file, bucket_name, filename, ExtraArgs={'ContentType': file.content_type})
    except Exception as e:
        return jsonify({'message': f'Failed to upload image: {e}'}), 201


    image_url = f'https://{bucket_name}.s3.amazonaws.com/{filename}'

    description = request.form.get('description')

    meal = Meal(user_id = current_user.user_id, description = description, image_url = image_url)
    db.session.add(meal)
    db.session.commit()

    return jsonify({'message': 'successfully logged meal'})



@app.route('/uploadProfilePicture', methods = ['POST'])
@login_required
def uploadProfilePicture():
    file = request.files['image']
    if 'image' not in request.files: 
        return jsonify({'message': 'expected image'}), 400
    filename = f"{current_user.username}_profilePicture.jpg"
    bucket_name = 'mealbuildr-bucket'
    try:
        s3_client.upload_fileobj(file, bucket_name, filename, ExtraArgs={'ContentType': file.content_type})
    except Exception as e:
        return jsonify({'message': f'Failed to upload image: {e}'}), 201

    image_url = f"https://{bucket_name}.s3.amazonaws.com/{filename}?v={datetime.now().strftime('%Y%m%d%H%M%S')}"
    current_user.profile_picture_url = image_url
    db.session.commit()

    return jsonify({'message': 'successfully changed profile picture'})





@app.route('/getMealImage/<filename>')
def get_meal_image(filename):
    bucket_name = 'mealbuildr-bucket'
    try:
        response = s3_client.generate_presigned_url('get_object', 
                                                    Params={'Bucket': bucket_name, 'Key': filename},
                                                    ExpiresIn=3600)
    except ClientError as e:
        return jsonify({'error': str(e)}), 500

    return jsonify({'url': response})