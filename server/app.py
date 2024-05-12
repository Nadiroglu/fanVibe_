from models import db, User, FanClub, ClubMembers, Posts, Comments, Participants, Message, Inbox, CommentReplies, MembershipRequest
from flask_migrate import Migrate
import stripe
from flask import Flask, request, jsonify, session, json
from flask_restful import Api, Resource
from flask_cors import CORS
import os
from datetime import datetime
from dotenv import dotenv_values
from flask_socketio import SocketIO, emit, join_room, leave_room
import logging
from werkzeug.utils import secure_filename


BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False
UPLOAD_FOLDER = '../client/public' #os.path.join('src', 'assets')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

logging.basicConfig(level=logging.DEBUG)

config = dotenv_values(".env")
app.secret_key = config["SECRET_KEY"]

migrate = Migrate(app, db)
db.init_app(app)
stripe.api_key = 'sk_test_51P5xgsKiofAVDtVIgVKnPOZh63ZLc2CyZvWeQGJloskP35dw7LOeasSFnkMVgQ7V9wzObP77q0oTDVRs7Gmpr7Ny00iXobH4bn'

api = Api(app)
CORS(app, supports_credentials=True, origins="http://localhost:5173")
# CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
socketio = SocketIO(app, cors_allowed_origins="*", transports=['websocket'])



ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



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
        )
    except ValueError:
        return {'error': ['validation erros']}, 400

    db.session.add(new_user)
    db.session.commit()

    
    new_participant = Participants(user_id=new_user.id, inbox_id = new_user.id)
    db.session.add(new_participant)
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



@app.route('/api/fan_clubs/<int:id>', methods = ['GET', 'POST'])
def fan_clubs_by_id(id):
    if request.method == 'GET':
        fanclub = FanClub.query.filter(FanClub.id == id).first()
        return fanclub.to_dict(rules =['-posts.comments.user._password_hash','-posts.comments.user.club_members', '-posts.user._password_hash','-posts.user.club_members']), 200 #
    elif request.method == 'POST':
        data = request.form

        if 'user_id' not in session:
            return jsonify({"error": "User not authenticated"}), 401
        if 'image' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        
        file = request.files['image']
        # import ipdb; ipdb.set_trace()

        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        
            try: 
                new_post = Posts(
                    content = data.get('content'),
                    post_img = filename, #data.get('post_img'),
                    user_id = session['user_id'],
                    club_id = id
                )
                db.session.add(new_post)
                db.session.commit()
                return new_post.to_dict(), 201
            except ValueError:
                return {'error': ['validation erros']}, 400
        else:
            return jsonify({"error": "File type not allowed"}), 400



@app.route('/api/comments', methods = ['GET', 'POST'])
def add_comment():
    
    # comments = Comments.query.all()

    if request.method == 'GET':
        return [comment.to_dict() for comment in Comments.query.all()]

    elif request.method == "POST":
        data = request.get_json()
        # post = Posts.query.filter(Posts.id == id).first()

        try:
            new_comment = Comments(
                content = data.get('content'),
                user_id = session['user_id'],
                post_id = data.get('post_id'),
            )
        except ValueError:
            return jsonify({"error": "User not authenticated"}), 401
        
        db.session.add(new_comment)
        db.session.commit()

        return new_comment.to_dict(), 201
    
@app.route('/api/replies', methods= ['GET','POST'])
def replies():
    
    if request.method == 'GET':
        return [reply.to_dict(rules=['-user._password_hash']) for reply in CommentReplies.query.all()]
    elif request.method == 'POST':
        data = request.get_json()
        try: 
            reply = CommentReplies(
                content = data.get('content'),
                user_id = session['user_id'],
                comment_id = data.get('comment_id')
            )
        except ValueError:
            return jsonify({"error": "User not authenticated"}), 401

        db.session.add(reply)
        db.session.commit()

        return reply.to_dict(rules=['-user._password_hash']), 201


    
@app.route('/api/user/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def get_user(id):
    user = User.query.filter(User.id == id).first()

    if request.method == 'GET':
        return user.to_dict(rules=['-_password_hash']), 200
    
    elif request.method == 'PATCH':
        data = request.get_json()
        user_id = session['user_id']
        old_password = data.get('old_password')
        new_password = data.get('new_password')

        if old_password and user.authenticate(old_password):
            # Update user attributes
            for key, value in data.items():
                # Skip updating the old and new passwords
                if key not in ['old_password', 'new_password']:
                    setattr(user, key, value)
            # Generate a new hashed password for the user
            user.password_hash = new_password
            session.pop('user_id')
            db.session.commit()
            return user.to_dict(rules=['-_password_hash']), 200
        else:
            return jsonify({"error": "Old password is incorrect"}), 400
            

user_rooms = {}

@socketio.on('join')
def join(data):
    user_id = data['user_id']
    room = data['room']
    user_rooms[user_id] = room
    join_room(room)

@socketio.on('leave')
def leave(data):
    user_id = data['user_id']
    room = user_rooms.pop(user_id, None)
    if room:
        leave_room(room)

@socketio.on('message')
def handle_message(data):
    sender_id = session.get('user_id')
    receiver_id = data.get('receiver_id')
    message_content = data.get('message')
    print("Received message:", data)

    logging.debug(f"Received message data: sender_id={sender_id}, receiver_id={receiver_id}, message_content={message_content}")

    if sender_id:
        sender_user = db.session.get(User, sender_id)
        receiver_user = db.session.get(User, receiver_id)
        # receiver_user = db.session.get(User, receiver_user)
        print("Sender ID obtained from session:", sender_id)
        sender_user = db.session.get(User, sender_id)
        if sender_user:
            print("Sender user found:", sender_user.username)
        
            try:
                participant = Participants.query.filter_by(user_id=sender_id).first()
                if participant:
                    sender_inbox_id = participant.inbox_id
                    print("Sender inbox ID:", sender_inbox_id)
                    
                    receiver_participant = Participants.query.filter_by(user_id=receiver_id).first()
                    # receiver_participant = Participants.query.filter_by(receiver=receiver_id.username).first()
                    print(receiver_participant)
                    if receiver_participant:
                        receiver_inbox_id = receiver_participant.inbox_id
                        print("Receiver inbox ID:", receiver_inbox_id)
                    else:
                        new_inbox = Inbox(user_id=receiver_id)
                        db.session.add(new_inbox)
                        db.session.commit()
                        receiver_inbox_id = new_inbox.id
                        print("Created new receiver inbox:", receiver_inbox_id)
                    new_message = Message(sender_id=sender_id, receiver_id=receiver_id, inbox_id=receiver_inbox_id, message_content=message_content)
                    print("New message:", new_message)
                    try:
                        # Attempt to add the new message to the database
                        db.session.add(new_message)
                        db.session.commit()
                        print("Message saved successfully")

                        messages = Message.query.all()
                        print(messages)

                        # Retrieve all messages from the database after the commit
                        messages = Message.query.all()
                        print("All messages after commit:", messages)

                        room = user_rooms.get(receiver_id)
                        if room:
                            emit('message', {'sender_id': sender_id, 'message': message_content}, room=room)
                    except Exception as e:
                        # Catch any exceptions and print them for debugging
                        print("Error saving message:", e)
                        emit('error_message', {'error': str(e)})
                # else:
                #     emit('error_message', {'error': 'Sender or receiver not found'})
            except Exception as e:
            # Catch any exceptions and print them for debugging
                emit('error_message', {'error': str(e)})
        else:
            emit('error_message', {'error': 'Sender user not found'})

        
    else:
        emit('error_message', {'error': 'Sender ID is not available in session'})


@app.route('/api/inbox', methods=['GET'])
def get_inbox():
    user_id = session.get('user_id')

    if not user_id:
        return jsonify({"error": "User not logged in"}), 401

    participant = Participants.query.filter_by(user_id=user_id).first()

    if not participant:
        return jsonify({"error": "Participant not found"}), 401

    inbox = participant.inbox

    if not inbox:
        return jsonify({"error": "Inbox not found"}), 401

    # Fetch messages where the user is the sender or the receiver
    sent_messages = Message.query.filter_by(sender_id=user_id).all()
    received_messages = Message.query.filter_by(receiver_id=user_id).all()

    message_details = []

    # Process sent messages
    for message in sent_messages:
        message_details.append({
            "sender_id": user_id,
            "sender_username": participant.user.username,
            "sender_profpic": message.sender.prof_pic_url,
            "message": message.message_content
        })

    # Process received messages
    for message in received_messages:
        message_details.append({
            "sender_id": message.sender_id,
            "sender_username": message.sender.username,
            "sender_profpic": message.sender.prof_pic_url,
            "message": message.message_content
        })

    return jsonify({"messages": message_details}), 200

# @app.route('/api/inbox', methods = [ 'GET'])
# def get_inbox():
#     user_id = session.get('user_id')

#     if not user_id:
#         return jsonify({"error": "User not logged in"}), 401
    
#     participant = Participants.query.filter_by(user_id=user_id).first()

#     if not participant:
#         return jsonify({"error": "Participant not found"}), 401
    
#     inbox = participant.inbox
    

#     if not inbox:
#         return jsonify({"error": "Inbox not found"}), 401
    
#     participants = inbox.participants
#     participant_ids = [participant.user.id for participant in participants]

#     users = User.query.filter(User.id.in_(participant_ids)).all()
#     user_details = [{"id": user.id, "username": user.username} for user in users]

#     messages = Message.query.filter_by(inbox_id = inbox.id).all()
#     message_details = [{"sender_id": message.sender_id, "sender_username": message.sender.username, "sender_profpic": message.sender.prof_pic_url,  "message": message.message_content} for message in messages]

#     return jsonify({"inbox": user_details, "messages": message_details}), 200



@app.route('/api/send_membership_request', methods=['POST'])
def send_request():
    if request.method == 'POST':
        data = request.json
        user_id = data.get('user_id')
        fanclub_id = data.get('fanclub_id')
        request_id = data.get('id')

        already_sent_request = MembershipRequest.query.filter_by(user_id=user_id, id=request_id).all()
        if already_sent_request:
            return jsonify({'error': 'You already sent request still under review'})
        
        existing_request = MembershipRequest.query.filter_by(user_id=user_id, fanclub_id=fanclub_id).first()
        if existing_request:
            return jsonify({'error': 'You are already a member of this fan club'}), 400
        
        new_request = MembershipRequest(
            user_id = user_id,
            fanclub_id=fanclub_id
        )
        db.session.add(new_request)
        db.session.commit()
        return jsonify({'message': 'Membership request sent successfully'}), 200


@app.route('/api/admin/notifications', methods=['GET'])
def get_admin_notification():
    #NOTE getting admin_id from front end as we fetch
    admin_id = request.args.get('admin_id')

    # user_id will be admin_id if that user is an admin isAdmin= True
    admin_fanclubs = ClubMembers.query.filter_by(user_id=admin_id, isAdmin=True).all()
    fanclub_ids = [fanclub.fanclub_id for fanclub in admin_fanclubs]
    #filter the notifications which are in pending status in order accept or deny them
    notifications = MembershipRequest.query.filter(MembershipRequest.fanclub_id.in_(fanclub_ids), MembershipRequest.status == 'Pending').all()
    notification_data = [{'id': notification.id, 'request_username': notification.user.username, 'user_id': notification.user_id, 'fanclub_id': notification.fanclub_id} for notification in notifications]

    return jsonify(notification_data), 200


@app.route('/api/admin/notifications/<int:notification_id>/respond', methods = ['PUT'])
def respond_to_membership_requests(notification_id):
    data = request.json
    response = data.get('response')

    notification = MembershipRequest.query.get(notification_id)
    if not notification:
        return jsonify({'error': 'Notification not found'}), 400
    
    if response == 'accept':
        notification.status = 'Accepted'

        new_member = ClubMembers(user_id=notification.user_id, fanclub_id = notification.fanclub_id)
        db.session.add(new_member)
        db.session.commit()
        return jsonify({'messae': 'Membership request accepted'}), 200
    elif response == 'deny':
        notification.status = 'Denied'
        db.session.commit()
        return jsonify({'message': 'Membership request denied'}), 200
    else:
        return jsonify({'error': 'Invalid response'}), 400




if __name__ == '__main__':
    socketio.run(app, port=5555, debug=True)



