from db import db

class ServiceModel(db.Model):
    __tablename__ = 'services'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(1000))
    maxBookings = db.Column(db.Integer, nullable=False)
    startTime = db.Column(db.Time(), nullable=False)
    endTime = db.Column(db.Time(), nullable=False)
    timeSlotLen = db.Column(db.Integer, nullable=False)
    account_id = db.Column(db.Integer, db.ForeignKey('accounts.id'), nullable=False)
    bookings = db.relationship('BookingModel', backref='service', lazy=True)

    def __init__(self, name, description, maxBookings, startTime, endTime, timeSlotLen, account_id):
        self.name = name
        self.description = description
        self.maxBookings = maxBookings
        self.startTime = startTime
        self.endTime = endTime
        self.timeSlotLen = timeSlotLen
        self.account_id = account_id

    def json(self):
        return {
            'id': self.id,
            'name': self.name, 
            'description': self.description,
            'maxBookings': self.maxBookings,
            'startTime': str(self.startTime),
            'endTime': str(self.endTime),
            'timeSlotLen': self.timeSlotLen, 
            'account_id': self.account_id
        }

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).first()
    
    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    @classmethod
    def find_by_account(cls, account_id):
        return cls.query.filter_by(account_id=account_id)

    def save_to_db(self):  
        db.session.add(self)
        db.session.commit()  

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()