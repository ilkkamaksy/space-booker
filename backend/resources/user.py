from flask_restful import Resource, reqparse
from models.user import UserModel

class UserAccount(Resource):
    parser = reqparse.RequestParser()  
    parser.add_argument('username', type=str, required=True, help='Username cannot be empty')
    parser.add_argument('email', type=str, required=True, help='Email cannot be empty')
    parser.add_argument('password', type=str, required=True, help='Password cannot be empty')

    def post(self):
        data = UserAccount.parser.parse_args()

        if UserModel.find_by_username(data['username']):
            return {'message': 'User already exists, aborting.'}, 400

        user = UserModel(**data)
        user.save_to_db()

        return {'message': 'User has been created successfully.'}, 201

    
