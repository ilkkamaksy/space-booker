from flask import Flask
from flask_restful import Api
from flask_jwt import JWT, jwt_required, current_identity
import os
from config import config
from db import db
from resources.user import UserAccount
from resources.account import Account, AccountSingular
from resources.service import Service, ServiceSingular, ServiceList
from resources.booking import Booking, BookingSingular, BookingList
from security import authenticate, identity

app = Flask(__name__)

if os.environ.get("HEROKU"):
    app.config.from_object(config['production'])
else:
    app.config.from_object(config['development'])

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SECRET_KEY'] = 'super-secret'

api = Api(app)

db.init_app(app)

@app.before_first_request
def create_tables():
    db.create_all()

jwt = JWT(app, authenticate, identity) 

api.add_resource(UserAccount, '/register')
api.add_resource(Account, '/accounts')
api.add_resource(AccountSingular, '/accounts/<int:id>')
api.add_resource(Service, '/services')
api.add_resource(ServiceSingular, '/services/<int:id>')
api.add_resource(ServiceList, '/services/account/<int:account_id>')
api.add_resource(Booking, '/bookings', endpoint='booking_resource')
api.add_resource(BookingSingular, '/bookings/<int:id>', endpoint='booking_singular_resource')
api.add_resource(BookingList, '/bookings/service/<int:service_id>', endpoint='booking_by_services')

@app.route('/me')
@jwt_required()
def protected():
    return '%s' % current_identity.id

if __name__ == '__main__':
    app.run(debug=True)
