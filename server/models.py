from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
import re
from flask_bcrypt import Bcrypt
from sqlalchemy.ext.hybrid import hybrid_property


metadata = MetaData(
    namin_convention = {
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
    password_hash = db.Column(db.String(128), nullable=False)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    prof_pic_url = db.Column(db.String(255))
    role = db.Column(db.String, default = 'User')


    club_members = db.relationship("ClubMembers", back_populates = "admin")
    fan_clubs = association_proxy("club_members", "fanclub")
    serialize_rules = ("-club_members.admin",)


class ClubMembers(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key = True)
    admin_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    fanclub_id = db.Column(db.Integer, db.ForeignKey('fanclubs.id'))

    admin = db.relationship("User", back_populates = "club_members")
    fanclub = db.relationship("FanClub", back_populates = "club_members")
    serialize_rules =('admin.club_members', 'fanclub.club_members')



class FanClub(db.Model, SerializerMixin):

    __tablename__ = 'fanclubs'

    id = db.Column(db.Integer, primary_key = True)
    sport_type = db.Column(db.String, default = 'soccer')
    name = db.Column(db.String, unique=True, nullable = False)
    description = db.Column(db.Text) 
    created_at = db.Column(db.DateTime, default=db.func.now()) 
    privacy_setting = db.Column(db.String) 
    logo_url = db.Column(db.String(255))  
    location = db.Column(db.String(255)) 
    facebook_url = db.Column(db.String(255))  
    instagram_url = db.Column(db.String(255))
    twitter_url = db.Column(db.String(255)) 
    member_count = db.Column(db.Integer, default=0) 

    club_members = db.relationship("ClubMembers", back_populates = "fanclub")
    admins = association_proxy("club_members", "admin")
    serialize_rules = ("club_members.fanclub", )




