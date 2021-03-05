from flask_restful import Resource, reqparse
from flask_jwt import jwt_required, current_identity
from models.account import AccountModel
from models.user import UserModel
from models.user_account_roles import UserAccountRolesModel
from models.role import RoleModel

class Account(Resource):
    parser = reqparse.RequestParser(bundle_errors=True)    
    parser.add_argument('name', type=str, required=True, help='Name cannot be empty')
    parser.add_argument('siteUrl', type=str)
    parser.add_argument('description', type=str)

    @jwt_required()
    def post(self):
        
        data = Account.parser.parse_args()
        account = AccountModel(**data)
        account.users.append(current_identity)

        role = RoleModel.find_by_role('owner')
        user_account_role = UserAccountRolesModel(current_identity.id, role.id)

        account.user_roles.append(user_account_role)
        
        try:
            account.save_to_db()
        except Exception as e:
            return {
                "message": str(e)
            }, 500

        return account.json(), 201

    @jwt_required()
    def get(self):

        id = current_identity.id
        return [account.json() for account in AccountModel.find_by_user_id(id)] 
        


class AccountSingular(Resource):

    def get(self, id):
        account = AccountModel.find_by_id(id)
        if account:
            return account.json(), 201
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
        
        account.name = data.name
        account.description = data.description
        account.siteUrl = data.siteUrl

        try:
            account.save_to_db()
        except Exception as e:
            return {
                "message": str(e)
            }, 500

        return account.json(), 201


class AccountUser(Resource):

    parser = reqparse.RequestParser(bundle_errors=True)    
    parser.add_argument('role', type=str, required=True, help='Role cannot be empty')
    parser.add_argument('username', type=str, required=True, help='Username cannot be empty')
    
    @jwt_required()
    def put(self, account_id):

        data = AccountUser.parser.parse_args()
        account = AccountModel.find_by_id(account_id)

        owner = next((x for x in account.user_roles if x.user_id == current_identity.id), None)

        if owner is None or owner.role.role != 'owner':
            return {
                "message": 'Unauthorized'
            }, 401

        role = RoleModel.find_by_role(data.role)
        user = UserModel.find_by_username(data.username)

        if role is None or account is None or user is None:
            return {
                "message": 'Invalid username, role or account id'
            }, 400

        user_account_role = UserAccountRolesModel(user.id, role.id)
        
        account.user_roles.append(user_account_role)
        account.users.append(user)
        
        try:
            account.save_to_db()
        except Exception as e:
            return {
                "message": str(e)
            }, 500

        return account.json(), 201
