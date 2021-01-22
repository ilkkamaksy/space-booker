from flask import Response, jsonify
from . import api 

@api.route('/', methods = ['GET'])
def home():

    return jsonify('hello world')