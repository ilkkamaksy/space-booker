from os import getenv

class DevelopmentConfig():
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = getenv("DATABASE_URL")
    SQLALCHEMY_ECHO = True

class TestingConfig():
    TESTING = True
    SQLALCHEMY_DATABASE_URI = getenv("DATABASE_URL_TEST")
    SQLALCHEMY_ECHO = True

class ProductionConfig():
    SQLALCHEMY_DATABASE_URI = getenv("DATABASE_URL")

config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}