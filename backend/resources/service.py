from flask_restful import Resource, reqparse, inputs
from flask_jwt import jwt_required, current_identity
from models.service import ServiceModel

class Service(Resource):
    parser = reqparse.RequestParser()  
    parser.add_argument('name', type=str, required=True, help='Name cannot be empty')
    parser.add_argument('description', type=str)
    parser.add_argument('maxBookings', type=int)
    parser.add_argument('startTime', type=lambda x: inputs.datetime.strptime(x,'%H:%M'))
    parser.add_argument('endTime', type=lambda x: inputs.datetime.strptime(x,'%H:%M'))
    parser.add_argument('timeSlotLen', type=int)
    parser.add_argument('account_id', type=int)

    @jwt_required()
    def post(self):
        
        data = Service.parser.parse_args()
        service = ServiceModel(**data)
        
        try:
            service.save_to_db()
        except Exception as e:
            return {
                "message": str(e)
            }, 500
        return service.json(), 201



class ServiceSingular(Resource):

    def get(self, id):
        service = ServiceModel.find_by_id(id)
        if service:
            return service.json()
        return {
            "message": 'Item not found'
        }, 404

    @jwt_required()
    def delete(self, id):

        service = ServiceModel.find_by_id(id)
        if service:
            service.delete_from_db()

            return {
                'id': id
            }, 200

    @jwt_required()
    def put(self, id):

        data = Service.parser.parse_args()
        service = ServiceModel.find_by_id(id)

        if service is None:
            return {
                "message": 'Item not found'
            }, 404
            
        service.name = data['name']
        service.description = data['description']    
        service.startTime = data['startTime']
        service.endTime = data['endTime']
        service.maxBookings = data['maxBookings']
        service.timeSlotLen = data['timeSlotLen']
        
        service.save_to_db()

        return service.json(), 201
        

class ServiceList(Resource):

    def get(self, account_id):
        return [service.json() for service in ServiceModel.find_by_account(account_id)]
