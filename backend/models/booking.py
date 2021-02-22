from db import db
from sqlalchemy import desc
from .service import ServiceModel
from .account import AccountModel

class BookingModel(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(200), nullable=False)
    date = db.Column(db.Date, nullable=False)
    dateTime = db.Column(db.DateTime, nullable=False)
    slotNumber = db.Column(db.Integer, nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=False)
    service = db.relationship('ServiceModel', back_populates='bookings')

    def __init__(self, email, date, dateTime, slotNumber, service_id):
        self.email = email
        self.date = date
        self.dateTime = dateTime
        self.slotNumber = slotNumber
        self.service_id = service_id

    def json(self):
        return {
            'id': self.id,
            'email': self.email,
            'date': str(self.date),
            'dateTime': str(self.dateTime),
            'slotNumber': self.slotNumber,
            'service': {
                'name': self.service.name,
                'id': self.service.id,
                'description': self.service.description,
                'timeSlotLen': self.service.timeSlotLen,
                'account_id': self.service.account_id
            }
        }

    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email)

    @classmethod
    def find_by_service_id(cls, service_id):
        return cls.query.filter_by(service_id=service_id)

    @classmethod
    def find_by_service_id_and_date(cls, service_id, date):
        return cls.query.filter_by(service_id=service_id,date=date)
    

    @classmethod
    def find_by_account_id(cls, account_id, limit, offset):
        return cls.query.join(
                ServiceModel
            ).join(
                AccountModel
            ).filter(
                AccountModel.id == account_id
            ).order_by(
                desc(cls.id)
            ).limit(
                limit
            ).offset(
                offset
            ).all()


    @classmethod
    def find_by_account_id_and_date(cls, account_id, date):
        return cls.query.filter_by(
                date=date
            ).join(
                ServiceModel
            ).join(
                AccountModel
            ).filter(
                AccountModel.id == account_id
            ).all()

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    def save_to_db(self):  
        db.session.add(self)
        db.session.commit()  

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()