from models import db
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



if __name__ == '__main__':
    app.run(port=5555, debug=True)



