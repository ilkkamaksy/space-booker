from flask_restful import Resource, reqparse
from flask_jwt import jwt_required, current_identity
from models.account import AccountModel
from models.user import UserModel

class Account(Resource):
    parser = reqparse.RequestParser()  
    parser.add_argument('name', type=str, required=True, help='Name cannot be empty')
    parser.add_argument('siteUrl', type=str)
    parser.add_argument('description', type=str)

    @jwt_required()
    def post(self):
        
        data = Account.parser.parse_args()
        account = AccountModel(**data)
        account.users.append(current_identity)
        
        try:
            account.save_to_db()
        except Exception as e:
            return {
                "message": str(e)
            }, 500
        return {
            "id": account.id,
            "name": account.name,
            "siteUrl": account.siteUrl,
            "description": account.description,
            "users": [user.json() for user in account.users]
        }, 201



class AccountShow(Resource):

    @jwt_required()
    def get(self, id):
        account = AccountModel.find_by_id(id)
        if account:
            return {
                "id": account.id,
                "name": account.name,
                "siteUrl": account.siteUrl,
                "description": account.description,
                "users": [user.json() for user in account.users]
            }
        return {
            "message": 'Item not found'
        }, 404

    @jwt_required()
    def delete(self, id):

        account = AccountModel.find_by_id(id)
        if account:
            account.delete_from_db()

            return {'message': 'account has been deleted'}

    @jwt_required()
    def put(self, id):

        data = Account.parser.parse_args()
        account = AccountModel.find_by_id(id)

        if account is None:
            return {
                "message": 'Item not found'
            }, 404
            
        updatedAccount = {
            "id": account.id,
            "name": data.name,
            "description": data.description,
            "siteUrl": data.siteUrl,
            "users": account.users
        }

        account.name = data['name']
        account.description = data['description']
        account.siteUrl = data['siteUrl']

        account.save_to_db()

        return {
            "id": account.id,
            "name": account.name,
            "siteUrl": account.siteUrl,
            "description": account.description,
            "users": [user.json() for user in account.users]
        }, 201
