from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, func
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
import re
from flask_bcrypt import Bcrypt
from sqlalchemy.ext.hybrid import hybrid_property


metadata = MetaData(
    naming_convention = {
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

db =SQLAlchemy(metadata=metadata)
bcrypt = Bcrypt()


class User(db.Model, SerializerMixin):

    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(50), unique = True, nullable = False)
    email = db.Column(db.String(120), unique =True, nullable = False)
    _password_hash = db.Column(db.String(128), nullable=False)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    prof_pic_url = db.Column(db.String(255))


    club_members = db.relationship("ClubMembers", back_populates = "user")
    fan_clubs = association_proxy("club_members", "fanclub")
    posts = db.relationship('Posts', back_populates = 'user')
    comments = db.relationship('Comments', back_populates = 'user')
    membership_requests = db.relationship("MembershipRequest", back_populates="user")
    requests = association_proxy('membership_requests', 'fanclub')
    inboxes = db.relationship('Participants', back_populates='user')
    replies = db.relationship('CommentReplies', back_populates = 'user')

    serialize_rules = ("-club_members", '-comments', '-posts', '-membership_requests', '-requests', '-inboxes.user', '-replies') 



    @validates('username')
    def valdiate_username(self, key, username ):
        if not username:
            raise ValueError("Username is required")
        if len(username) > 50:
            raise ValueError('Username must contain maximum 50 characters')
        return username
    
    @validates('email')
    def validate_email(self, key, email):
        if not email:
            raise ValueError('Email is required')
        if len(email) > 120:
            raise ValueError('Email must be maximum 120 characters')
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            raise ValueError('Invalid email adress format')
        return email

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, new_password):
        if new_password is not None:
            pass_hash = bcrypt.generate_password_hash(new_password.encode('utf-8'))
            self._password_hash = pass_hash.decode('utf-8')

    def authenticate(self, password):
        if self._password_hash is None:
            return False
        else:
            return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    


class ClubMembers(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id')) 
    fanclub_id = db.Column(db.Integer, db.ForeignKey('fanclubs.id'))
    isAdmin = db.Column(db.Boolean, default = False)

    user = db.relationship("User", back_populates = "club_members") 
    fanclub = db.relationship("FanClub", back_populates = "club_members")


    serialize_rules = ('-fanclub', '-user._password_hash', 'isAdmin') 



class MembershipRequest(db.Model, SerializerMixin):
    __tablename__ = 'membership_requests'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    fanclub_id = db.Column(db.Integer, db.ForeignKey('fanclubs.id'))
    status = db.Column(db.String(20), default='Pending')  # Pending, Accepted, Denied

    user = db.relationship("User", back_populates="membership_requests")
    fanclub = db.relationship("FanClub", back_populates="membership_requests")

    serialize_rules = ('-user', '-fanclub')





class FanClub(db.Model, SerializerMixin):

    __tablename__ = 'fanclubs'

    id = db.Column(db.Integer, primary_key = True)
    sport_type = db.Column(db.String, default = 'soccer')
    name = db.Column(db.String, unique=True, nullable = False)
    description = db.Column(db.Text) 
    created_at = db.Column(db.DateTime, default=db.func.now()) 
    privacy_setting = db.Column(db.String, default = 'Public') 
    logo_url = db.Column(db.String(255))  
    location = db.Column(db.String(255), default = 'United States of America') 
    facebook_url = db.Column(db.String(255))  
    instagram_url = db.Column(db.String(255))
    twitter_url = db.Column(db.String(255)) 
    member_count = db.Column(db.Integer, default=0)


    club_members = db.relationship("ClubMembers", back_populates = "fanclub")
    users = association_proxy("club_members", "user")
    posts = db.relationship('Posts', back_populates = 'fanclub')
    membership_requests = db.relationship("MembershipRequest", back_populates="fanclub")
    requests = association_proxy('membership_requests', 'user')

    serialize_rules = ("-club_members.fanclub", '-posts.fanclub', '-admins', '-membership_requests.fanclub')



class Posts(db.Model, SerializerMixin):

    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key = True)
    content = db.Column(db.String, nullable = False)
    post_img = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    club_id = db.Column(db.Integer, db.ForeignKey('fanclubs.id'))

    user = db.relationship('User', back_populates = 'posts')
    fanclub = db.relationship('FanClub', back_populates = 'posts')
    comments = db.relationship('Comments', back_populates = 'post')
    serialize_rules = ('-user.posts', '-fanclub.posts', '-comments.post', '-user', '-user._password_hash')


class Comments(db.Model, SerializerMixin):

    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=db.func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))

    user = db.relationship("User", back_populates="comments")
    post = db.relationship("Posts", back_populates="comments")
    replies = db.relationship('CommentReplies', back_populates = 'comment')


    serialize_rules=('-post.comments', '-user')


class CommentReplies(db.Model, SerializerMixin):
    __tablename__ = 'comment_replies'

    id = db.Column(db.Integer, primary_key = True)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=db.func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'))

    user = db.relationship("User", back_populates = "replies")
    comment = db.relationship('Comments', back_populates = 'replies')

    serialize_rules = ('-replies', '-comment')



# class Like(db.Model, SerializerMixin):
#     __tablename__ = 'likes'
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
#     post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))


class Inbox(db.Model, SerializerMixin):
    __tablename__ = 'inbox'
    id = db.Column(db.Integer, primary_key=True)
    last_message = db.Column(db.String(255))
    last_message_time = db.Column(db.DateTime)
    
    # Relationship to Participants
    participants = db.relationship('Participants', back_populates='inbox')
    # Relationship to Messages
    messages = db.relationship('Message', back_populates='inbox')
    
    serialize_rules = ('-participants', '-messages.inbox')

class Participants(db.Model, SerializerMixin):
    __tablename__ = 'participants'
    id = db.Column(db.Integer, primary_key=True)
    inbox_id = db.Column(db.Integer, db.ForeignKey('inbox.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    # Define relationship properties
    user = db.relationship('User', back_populates='inboxes')
    inbox = db.relationship('Inbox', back_populates='participants')
    # serialize_rules = ('-user', '-inbox')


class Message(db.Model, SerializerMixin):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    inbox_id = db.Column(db.Integer, db.ForeignKey('inbox.id'), nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message_content = db.Column(db.Text, nullable=False)
    datetime = db.Column(db.DateTime, nullable=False, default=func.now())  # Default value set to current timestamp
    
    # Define relationship properties
    sender = db.relationship('User', foreign_keys=[sender_id])
    receiver = db.relationship('User', foreign_keys=[receiver_id])
    inbox = db.relationship('Inbox', back_populates='messages')

    serialize_rules = ('-sender', '-receiver', '-inbox')



