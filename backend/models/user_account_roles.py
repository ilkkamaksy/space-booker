from db import db
from .user import UserModel
from .role import RoleModel

class UserAccountRolesModel(db.Model):
    __tablename__ = 'user_account_roles'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('UserModel')

    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
    role = db.relationship('RoleModel')

    account_id = db.Column(db.Integer, db.ForeignKey('accounts.id'), nullable=False)

    def __init__(self, user_id, role_id):
        self.user_id = user_id
        self.role_id = role_id

    def json(self):
        return {
            'id': self.id,
            'role': self.role.json(),
            'account_id': self.account_id,
            'user': {
                'id': self.user.id,
                'username': self.user.username,
                'email': self.user.email
            } 
        }

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_by_user_id_and_account_id(cls, user_id, account_id):
        return cls.query.filter_by(user_id=user_id,account_id=account_id).first()

    @classmethod
    def find_by_account_id(cls, account_id):
        return cls.query.filter_by(account_id=account_id)