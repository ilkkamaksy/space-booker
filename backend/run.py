from flask import Flask
from flask_restful import Api
from flask_jwt import JWT, jwt_required, current_identity
import os
from config import config
from resources.item import Item, ItemList 
from resources.user import UserAccount
from resources.account import Account, AccountShow
from security import authenticate, identity

app = Flask(__name__)

if os.environ.get("HEROKU"):
    app.config.from_object(config['production'])
else:
    app.config.from_object(config['development'])

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SECRET_KEY'] = 'super-secret'

api = Api(app)

@app.before_first_request
def create_tables():
    db.create_all()

jwt = JWT(app, authenticate, identity) 

api.add_resource(UserAccount, '/register')
api.add_resource(Item, '/items/<string:name>')
api.add_resource(ItemList, '/items')
api.add_resource(Account, '/accounts')
api.add_resource(AccountShow, '/accounts/<int:id>')

@app.route('/me')
@jwt_required()
def protected():
    return '%s' % current_identity.id

if __name__ == '__main__':
    from db import db
    db.init_app(app)
    app.run(debug=True)
