from db import db


class RoleModel(db.Model):
    __tablename__ = 'roles'

    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(80), unique=True)

    def __init__(self, role):
        self.role = role

    def json(self):
        return {
            'id': self.id,
            'role': self.role, 
        }

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_by_role(cls, _role):
        return cls.query.filter_by(role=_role).first()