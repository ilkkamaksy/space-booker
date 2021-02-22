from flask_restful import Resource, reqparse, inputs
from flask_jwt import jwt_required, current_identity
import datetime
from models.booking import BookingModel

class Booking(Resource):
    parser = reqparse.RequestParser(bundle_errors=True)  
    parser.add_argument('email', type=str, required=True, help='Email cannot be empty')
    parser.add_argument('date', type=lambda x: inputs.date(x), required=True, help='Date cannot be empty')
    parser.add_argument('dateTime', type=inputs.datetime_from_iso8601, required=True, help='Time cannot be empty')
    parser.add_argument('slotNumber', type=int, required=True, help='Time slot cannot be empty')
    parser.add_argument('service_id', type=int, required=True, help='Service id cannot be empty')

    def post(self):
        
        data = Booking.parser.parse_args()
        booking = BookingModel(**data)
        
        try:
            booking.save_to_db()
        except Exception as e:
            return {
                "message": str(e)
            }, 500
        return booking.json(), 201


class BookingSingular(Resource):

    def get(self, id):
        booking = BookingModel.find_by_id(id)
        if booking:
            return booking.json()
        return {
            "message": 'Item not found'
        }, 404

    @jwt_required()
    def delete(self, id):

        booking = BookingModel.find_by_id(id)
        if booking:
            booking.delete_from_db()

            return {'message': 'booking has been deleted'}

    @jwt_required()
    def put(self, id):

        data = Booking.parser.parse_args()
        booking = BookingModel.find_by_id(id)

        if booking is None:
            return {
                "message": 'Item not found'
            }, 404
            
        booking.email = data['email']
        booking.date = data['date']
        booking.date = data['time']    
        booking.slotNumber = data['slotNumber'] 
        
        booking.save_to_db()

        return booking.json(), 201
        
        
class BookingList(Resource):
    
    parser = reqparse.RequestParser()  
    parser.add_argument('date', location='args', type=lambda x: inputs.date(x))
    parser.add_argument('after', location='args', type=lambda x: inputs.date(x))
    parser.add_argument('before', location='args', type=lambda x: inputs.date(x))

    def get(self, account_id):

        params = BookingList.parser.parse_args()

        if (params.date):
            return [booking.json() for booking in BookingModel.find_by_account_id_and_date(account_id, params.date)] 
        elif (params.after and params.before):
            return [booking.json() for booking in BookingModel.find_by_account_id_and_date(account_id, params.date)] 
        elif (params.before):
            return [booking.json() for booking in BookingModel.find_by_account_id_and_date(account_id, params.date)] 
        elif (params.after):
            return [booking.json() for booking in BookingModel.find_by_account_id_and_date(account_id, params.date)] 
        
        return [booking.json() for booking in BookingModel.find_by_account_id(account_id)]
