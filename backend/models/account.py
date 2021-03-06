from db import db
from models.user import UserModel
from models.user_account_roles import UserAccountRolesModel

account_users = db.Table('account_users',
    db.Column('account_id', db.Integer, db.ForeignKey('accounts.id')),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'))
)

class AccountModel(db.Model):
    __tablename__ = 'accounts'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    siteUrl = db.Column(db.String(200))
    description = db.Column(db.String(1000))
    users = db.relationship("UserModel", secondary=account_users)
    services = db.relationship('ServiceModel', backref='account', cascade="all, delete-orphan", lazy=True)


    user_roles = db.relationship('UserAccountRolesModel', backref='user_account_roles', cascade="all, delete-orphan")

    def __init__(self, name, siteUrl, description):
        self.name = name
        self.siteUrl = siteUrl
        self.description = description

    def json(self):
        return {
            'id': self.id,
            'name': self.name, 
            'siteUrl': self.siteUrl,
            'description': self.description,
            'users': [user.json() for user in self.users],
            'user_roles': [user_role.json() for user_role in self.user_roles],
            'services': [service.json() for service in self.services]
        }

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    @classmethod
    def find_by_user_id(cls, user_id):
        return cls.query.filter(cls.users.any(id=str(user_id))).all()
        

    def save_to_db(self):  
        db.session.add(self)
        db.session.commit()  

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()