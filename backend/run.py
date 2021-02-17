from flask import Flask, send_from_directory, render_template
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

app = Flask(__name__, static_folder="build/static", template_folder="build")

if os.environ.get("HEROKU"):
    app.config.from_object(config['production'])
else:
    app.config.from_object(config['development'])

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.environ.get('JWT_SECRET')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False
api = Api(app, prefix='/api/v1')
    
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
api.add_resource(BookingList, '/bookings/account/<int:account_id>', endpoint='bookings_by_account')


@app.route('/<path:path>', methods=['GET', 'POST'])
def all_routes(path):
    if not(path.startswith('api')):
        return render_template('index.html')
    else:
        return redirect(url_for('404_error'))

@app.route('/api/v1/me')
@jwt_required()
def protected():
    return  {
        'id': current_identity.id,
        'username': current_identity.username,
        'email': current_identity.email
    }
    

if __name__ == '__main__':
    app.run(debug=True)
