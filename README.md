# Spaces Booking App

This app is for booking working spaces such as meeting rooms or work stations. Registered users can add working spaces to a booking calendar with 

- descriptions and images, 
- available hours - e.g. from 9:00-17:00,  
- time slots - anything from 15 minutes to a full working day,
- maximum bookings per time slot. 

Registered users can invite others to manage and edit their spaces, making collaboration easy. 

Booking calendars can be public, so anyone with a link to a booking calendar can make reservations, or access can be limited to a selected group of registered users. 

Registered users can view and manage bookings on the accounts they have access to.

## App in production

Try out the [application running in Heroku](https://space-booker.herokuapp.com/).

## Get started with development

This app has a Python Flask application serving a REST API in the backend and a React app consuming the API in the front end. You can get started with development or test the app on your local machine with the following instructions.

### Install and run backend

1. First, go to `/backend` folder and create an `.env` file and add the following variables:

```
DATABASE_URL=postgresql:///your-db 
DATABASE_URL_TEST=postgresql:///your-test-db
```

2. Next, start up the development environment with (make sure you are in `/backend` folder)

```$ python3 -m venv venv```

followed with

```$ source venv/bin/activate```

3. Install dependencies (skip this step if already installed):

```(venv) $ pip install -r requirements.txt```

4. Run backend with

```(venv) $ python run.py```

### Install and run frontend

1. Go to `/frontend` folder and install (skip if already installed) 

`yarn`

2. Run frontend in development mode with

`yarn start`

The app will be accessible in `localhost:3000`.
