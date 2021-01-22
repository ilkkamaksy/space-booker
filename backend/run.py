import os
from application import create_app

if os.environ.get("HEROKU"):
    app = create_app('production')
else:
    app = create_app('development')

if __name__ == '__main__':
    app.run(debug=True)
