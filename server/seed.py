from app import app
from models import db, User, FanClub, ClubMembers
from datetime import datetime

with app.app_context():
    print('Deleting data')

    db.session.query(User).delete()
    db.session.query(FanClub).delete()
    db.session.query(ClubMembers).delete()


    print('Creating Users')

    user = User(username = 'nailowski', email = "hey@gmail.com", password_hash = 'a', first_name = 'Nail', last_name = 'Osmanli', prof_pic_url = 'abc', role = 'Admin')
    user = User(username = 'ben', email = "ben@gmail.com", password_hash = 'a', first_name = 'Ben', last_name = 'Cavins', prof_pic_url = 'abc', role = 'User')

