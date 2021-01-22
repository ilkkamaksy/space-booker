
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import config

db = SQLAlchemy()

def create_app(config_name):
    app = Flask(__name__, static_folder="../build/static", template_folder="../build") 
    app.config.from_object(config[config_name]) 

    from .api import api as api_blueprint, views 
    app.register_blueprint(api_blueprint, url_prefix='/api/') 
    
    return app
