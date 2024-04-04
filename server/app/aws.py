


from app import app, s3_client
from werkzeug.utils import secure_filename
from flask_login import login_required, current_user
from flask import request, jsonify
from app.models import Meal
from app import db 


@app.route('/uploadMeal', methods = ['POST'])
@login_required
def uploadMeal(): 
    file = request.files['image']
    print(file)
    if file is None: 
        return jsonify({'message': 'expected image'}), 404
    filename = secure_filename(file.filename)
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