from app import app
from models import db, User, FanClub, ClubMembers, Posts, Comments, MembershipRequest, Inbox, Participants, Message, CommentReplies
from faker import Faker
from datetime import datetime

fake = Faker()

with app.app_context():
    print('Deleting data')

    db.session.query(User).delete()
    db.session.query(FanClub).delete()
    db.session.query(Posts).delete()
    db.session.query(Comments).delete()
    db.session.query(MembershipRequest).delete()
    db.session.query(Inbox).delete()
    db.session.query(Participants).delete()
    db.session.query(CommentReplies).delete()
    db.session.query(Message).delete()


    print('Creating Users')

    user1 = User(username = 'nailowski', email = "hey@gmail.com", password_hash = 'a', first_name = 'Nail', last_name = 'Osmanli', prof_pic_url = 'https://media.licdn.com/dms/image/D4E03AQHgbR18zJmTDw/profile-displayphoto-shrink_200_200/0/1707875068295?e=2147483647&v=beta&t=Ka9nOX_oJH0rfcEUZnPxnmwPhfCUbv-s1DQd3x7ytcE') #, role = 'Admin'
    user2 = User(username = 'ben', email = "ben@gmail.com", password_hash = 'a', first_name = 'Ben', last_name = 'Cavins', prof_pic_url = 'https://pbs.twimg.com/profile_images/756284317832056832/k4KFjvxw_400x400.jpg') #, role = 'User'
    users = [user1, user2]

    print('Creating Fan Clubs')
    fan_clubs = []
    for _ in range(100):  # Generate 10 fan clubs for each sport type
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

    posts = []
    for _ in range(2):
        user_id = fake.random_int(min=1, max=2)  # Assuming user IDs 1-2 exist in the database
        club_id = fake.random_int(min=1, max=2)  # Assuming fan club IDs 1-100 exist in the database

        post = Posts(
            content=fake.text(max_nb_chars=200),
            post_img=fake.image_url(),
            user_id=user_id,
            club_id=club_id
        )
        posts.append(post)

    comments = []
    for _ in range(2):
        user_id = fake.random_int(min=1, max=2)  # Assuming user IDs 1-2 exist in the database
        post_id = fake.random_int(min=1, max=2)  # Assuming post IDs 1-100 exist in the database

        comment = Comments(
            content=fake.text(max_nb_chars=100),
            user_id=user_id,
            post_id=post_id
        )
        comments.append(comment)

    print('Creating club members')

    member1 = ClubMembers(
        user_id = 1,
        fanclub_id = 1,
        isAdmin = True
    )
    member2 = ClubMembers(
        user_id = 2,
        fanclub_id = 2,
        isAdmin = False
    )
    member3 = ClubMembers(
        user_id = 2,
        fanclub_id = 1,
        isAdmin = False
    )
    members=[member1, member2, member3]


    inbox1 = Inbox(
        last_message='Hello, Bob!',
        last_message_time=datetime.now()
    )
    inbox2 = Inbox(
        last_message='Hello, There!',
        last_message_time=datetime.now()
    )
    inboxes = [inbox1, inbox2]

    participant1 = Participants(
        inbox_id= 1,
        user_id=1
    )

    participant2 = Participants(
        inbox_id=2,
        user_id=2
    )

    participants = [participant1, participant2]

    message1 = Message(
        inbox_id=1,
        sender_id=2,
        receiver_id = 1,
        message_content='Hi Bob, how are you?',
        datetime=datetime.now()
    )

    message2 = Message(
        inbox_id=1,
        sender_id=2,
        receiver_id = 1,
        message_content='Hi Alice, I\'m doing well, thanks!',
        datetime=datetime.now()
    )

    messages = [message1, message2]

    db.session.add_all(users)
    db.session.add_all(fan_clubs)
    db.session.add_all(posts)
    db.session.add_all(comments)
    db.session.add_all(members)

    db.session.add_all(inboxes)
    db.session.add_all(participants)
    db.session.add_all(messages)
    db.session.commit()
