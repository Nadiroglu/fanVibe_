# FlatEvent and Event Ticketing Website

Think about a social media page where there people who likes the same sports club as you do and i did it by using React for the frontend and Flask for the backend.

## Overview

The application allows users to browse fan clubs and make requests to join them. Each fan club is created by a user, who becomes the admin of that club. Admins have access to a special admin dashboard.
After a user's request is accepted by the admin, they become a member of the club and can join the community.
They can follow new people, get to know others, arrange meetings, engage in live chats, and connect with millions of people worldwide.
Each User has their Hashed and Saved, login information.


## Technologies Used

- React: A JavaScript library for building user interfaces.
- Flask: A lightweight web framework for Python.
- SQLite: A relational database management system used for data storage.
- Stripe Payment: Stripe development tools


## `Installing dependencies` Example


```python
cd backend
pipenv install
pipenv shell
python seed.py
python app.py
```

```python
cd client
npm install
```

## `Add your secret key at .env file in backend folder:
```python
#.env
SECRET_KEY = 'your_secret_key'
```

## WELCOME
<img width="1728" alt="Screenshot 2024-06-07 at 3 03 10 PM" src="https://github.com/Nadiroglu/final-project/assets/150474907/0ac871cd-8fb1-4a35-96d3-42e035c27be1">


## `Users can signup`
User's are able to set their own role, if they will be user they can not create an event 
<img width="1728" alt="Screenshot 2024-06-07 at 3 03 59 PM" src="https://github.com/Nadiroglu/final-project/assets/150474907/04f1f0fb-0c5c-4dc6-92e4-5b8e18fc3a6c">


## `Logging in as a User`
If a user is already having authentication they are able to log in if not register here button will take them to there
<img width="1728" alt="Screenshot 2024-06-07 at 3 04 20 PM" src="https://github.com/Nadiroglu/final-project/assets/150474907/19b99a1b-e2ed-4ffb-a6b0-06a248725294">


## USER HOME PAGE
User Can Brows FanCLubs and their details only when they are logged in 
# Each Fanclub has their Category, Location, Description and Logo. (For now pics are randomized by fake library in python)
<img width="1565" alt="Screenshot 2024-06-07 at 3 07 29 PM" src="https://github.com/Nadiroglu/final-project/assets/150474907/e4f437f5-f769-43e3-b862-faaac5fa50a8">
<img width="1728" alt="Screenshot 2024-06-07 at 3 07 56 PM" src="https://github.com/Nadiroglu/final-project/assets/150474907/1fdc67c5-4284-43bb-ab52-20e8e04f07b5">


## NEW USER 
New User's are not any member of any club and if they are not they will request to admin in order to join the club
<img width="1716" alt="Screenshot 2024-06-07 at 3 09 53 PM" src="https://github.com/Nadiroglu/final-project/assets/150474907/f6790224-fdce-4d9b-8b92-3dc84cf24bd2">
<img width="1030" alt="Screenshot 2024-06-07 at 3 13 28 PM" src="https://github.com/Nadiroglu/final-project/assets/150474907/2a3afdb5-fc0e-49d3-93e0-59454ed19506">

## Admin Dashboard
And the Admin will be able to see those requests and can accept or deny appropriately
<img width="521" alt="Screenshot 2024-06-07 at 3 15 24 PM" src="https://github.com/Nadiroglu/final-project/assets/150474907/dd420703-69a0-4759-a520-425b1df18cbb">
<img width="1716" alt="Screenshot 2024-06-07 at 3 16 11 PM" src="https://github.com/Nadiroglu/final-project/assets/150474907/3b899773-de4f-4f4c-9ce8-bed3c1573c0c">

## AND WHEN ADMIN ACCEPT THEY BECOME A MEMBER OF THAT CLUB
<img width="1728" alt="Screenshot 2024-06-07 at 3 17 21 PM" src="https://github.com/Nadiroglu/final-project/assets/150474907/a38f2a6e-5a65-4be6-8970-694543ad8a26">
<img width="725" alt="Screenshot 2024-06-07 at 3 17 57 PM" src="https://github.com/Nadiroglu/final-project/assets/150474907/5620315f-6fb0-467e-9d89-ef6d58269d7e">

## CLUB DETAIULS 
WHEN USER IS A MEMBER AS A MEMBER THEY CAN POST COMMENT REPLY DYNAMICALLY 
<img width="610" alt="Screenshot 2024-06-07 at 3 18 52 PM" src="https://github.com/Nadiroglu/final-project/assets/150474907/65052b4f-7fe8-4fa0-a49c-5352123d9111">

## USER DETAILS
USERS ARE ABLE TO EDIT THEIR PROFILE
<img width="1728" alt="Screenshot 2024-06-07 at 3 20 11 PM" src="https://github.com/Nadiroglu/final-project/assets/150474907/e10deb52-a9fa-4f55-a54a-93f9d32b7a6c">

## IF THEY GAVE THEIR PASSWORD TO THEIR PARTNER )) AND WANNA CHANGE THAT I CAN HELP THEM
USERS CAN CHANGE THEIR PASSWORD
<img width="803" alt="Screenshot 2024-06-07 at 3 20 01 PM" src="https://github.com/Nadiroglu/final-project/assets/150474907/d84e5c89-830c-4559-bdda-c5aab5755829">

## LIVE MESSAGING 
ONE OF THE CHALLENGING PART OF THIS PROJECT WAS LEARNING AND APLLYING NEW FEATURES AND I DID IT HERE. THEY CAN ALSO CHECK THEIR INBOX 
# UTILIZED WEBSOCKET AND SOCKET.IO
<img width="1711" alt="Screenshot 2024-06-07 at 3 21 42 PM" src="https://github.com/Nadiroglu/final-project/assets/150474907/57d20663-c44c-43ec-a899-6b948d0b8563">


## Feature Goal:
# 1. Social Networking Features
Expand social networking capabilities by allowing users to follow each other, send direct messages, and engage in group chats.
# 2.Mobile Application Development
Develop native mobile applications for iOS and Android platforms to provide a seamless and optimized experience for users on the go.
Ensure feature parity between the web and mobile versions of the platform while leveraging mobile-specific capabilities.
# 3. Monetization Strategies
Explore monetization opportunities such as premium memberships, sponsored content, and targeted advertising to sustain the platform's growth and development.
Implement a flexible and user-friendly payment system to support various monetization models while prioritizing user privacy and security.







