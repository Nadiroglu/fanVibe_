from app import app
from models import db, User, FanClub, ClubMembers
from faker import Faker


fake = Faker()

with app.app_context():
    print('Deleting data')

    db.session.query(User).delete()
    db.session.query(FanClub).delete()
    db.session.query(ClubMembers).delete()


    print('Creating Users')

    user1 = User(username = 'nailowski', email = "hey@gmail.com", password_hash = 'a', first_name = 'Nail', last_name = 'Osmanli', prof_pic_url = 'abc', role = 'Admin')
    user2 = User(username = 'ben', email = "ben@gmail.com", password_hash = 'a', first_name = 'Ben', last_name = 'Cavins', prof_pic_url = 'abc', role = 'User')
    users = [user1, user2]

    print('Creating Fan Clubs')
    fan_clubs = []
    for _ in range(10):  # Generate 10 fan clubs for each sport type
        sport_type = fake.random_element(elements=('soccer', 'basketball', 'cricket', 'tennis', 'golf', 
                                                    'rugby', 'baseball', 'ice hockey', 'athletics', 'table tennis'))
        name = fake.company() + " " + sport_type.capitalize() + " Fan Club"
        description = fake.paragraph()
        privacy_setting = fake.random_element(elements=('Public', 'Private'))
        logo_url = fake.image_url()
        location = fake.country()
        facebook_url = fake.uri()
        instagram_url = fake.uri()
        twitter_url = fake.uri()
        member_count = fake.random_int(100, 10000)

        fan_club = FanClub(
            sport_type=sport_type,
            name=name,
            description=description,
            privacy_setting=privacy_setting,
            logo_url=logo_url,
            location=location,
            facebook_url=facebook_url,
            instagram_url=instagram_url,
            twitter_url=twitter_url,
            member_count=member_count
        )
        fan_clubs.append(fan_club)


    db.session.add_all(users)
    db.session.add_all(fan_clubs)
    db.session.commit()
