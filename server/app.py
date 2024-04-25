from models import db, User, FanClub, ClubMembers
from flask_migrate import Migrate
import stripe
from flask import Flask, request, jsonify, session, json
from flask_restful import Api, Resource
from flask_cors import CORS
import os
from datetime import datetime
from dotenv import dotenv_values

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

config = dotenv_values(".env")
app.secret_key = config["SECRET_KEY"]

migrate = Migrate(app, db)
db.init_app(app)
stripe.api_key = 'sk_test_51P5xgsKiofAVDtVIgVKnPOZh63ZLc2CyZvWeQGJloskP35dw7LOeasSFnkMVgQ7V9wzObP77q0oTDVRs7Gmpr7Ny00iXobH4bn'

api = Api(app)
CORS(app, supports_credentials=True)





@app.route('/')
def method_name():
    pass

@app.route('/api/signup', methods=['POST'])
def signup():
    
    data = request.get_json()
    user = User.query.filter(User.username == data.get('username')).first()

    if user:
        return {'User already exists'}, 400
    
    try:
        new_user = User(
            username = data.get('username'),
            password_hash = data.get('password_hash'),
            email = data.get('email'),
            first_name = data.get('first_name'),
            last_name = data.get('last_name'),
            prof_pic_url = data.get('prof_pic_url'),
            role = data.get('role', 'User'),
        )
    except ValueError:
        return {'error': ['validation erros']}, 400

    db.session.add(new_user)
    db.session.commit()

    return new_user.to_dict(), 200



@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
    
    user = User.query.filter_by(username=username).first()

    if not user or not user.authenticate(password):
        return jsonify({"error": "Invalid username or password"}), 401
    
    if 'user_id' in session:
        user_id = session['user_id']
        user = User.query.get(user_id)
        if user:
            return jsonify({'message': "You are already logged in", "user": user.to_dict(rules = ['-_password_hash'])}), 200
    
    session['user_id'] = user.id

    return jsonify({'message': 'Log in successfull', 'user': user.to_dict(rules = ['-_password_hash'])}), 201


@app.route('/api/check_session')
def check_session():
    user_id = session.get('user_id')

    user = User.query.filter(User.id == user_id).first()

    if not user:
        return {'error': "User not found"}, 400
    return user.to_dict(rules=['-_password_hash']), 200

@app.route('/api/logout', methods = ['DELETE'])
def logout():
    
    if 'user_id' not in session:
        return {"message": "You are already logged out"}, 400
    
    user_id = session['user_id']
    user = User.query.get(user_id)

    exit_message = f"See you soon, {user.username}"
    
    # Return the formatted JSON response
    session.pop('user_id')

    return jsonify({'message': exit_message}), 200


@app.route('/api/fan_clubs')
def fan_clubs():
    return [fan_club.to_dict() for fan_club in FanClub.query.all() ]




if __name__ == '__main__':
    app.run(port=5555, debug=True)



