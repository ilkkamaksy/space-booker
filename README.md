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

Register your own user, or use the test user:

**username**: testijamppa

**password**: TosiSalainen#1

After you have logged in, go to the dashboard to manage your organizations. If you registered your own user, create a new organization.

Note: the idea behind organizations is that a user can create one or more organizations and then add available services/working spaces for each organization. With least one working space in an organization, a booking calendar for that organization will be available in the front end. 

So, when you have at least one organization, you can add services/spaces available for people to book. On the dashboard page, click "edit services" below your organization and create a new service/space.

When you create a service/space, fill out the required information:

- name, 
- description, 
- opening hours (default 09:00 - 17:00), 
- timeslot (i.e. 30min, 60min, etc. Defaults to 30 mins) and 
- max bookings per timeslot (defaults to 1). 

After saving, head back to the dashboard and click "view calendar" below your organization. You now will see your service in the organization calendar (the UI is a bit clumsy still at this point as there is no link to the calendar in the service management page). 

Check out the [example calendar for our test user](https://space-booker.herokuapp.com/account/2/calendar) for reference of how the calendar looks like.

The calendar view should be fairly intuitive to use: 

- change the date from the "date" select 
- time slots in the past are not available 
- view information about a space/service by clicking on the info icon next to the title (here again the ui is still work in progress) 
- to make a booking, simply click on a timeslot and give an email address. After booking, the slot will be reserved.

That is what you can do in the app for now. The missing features are: 

- bookings can be managed in the backend
- access to calendars can be restricted to selected users
- images can be attached to services
- more intuitive and easy to use UI
- a confirmation email will be sent to users who have made bookings
- when a booking occurs, a notification email will be sent to organization admins 



## Get started with development

This app has a Python Flask application serving a REST API in the backend and a React app consuming the API in the front end. You can get started with development or test the app on your local machine with the following instructions.

### Install and run backend

1. First, go to `/backend` folder and create an `.env` file and add the following variables:

```
DATABASE_URL=postgresql:///your-db 
DATABASE_URL_TEST=postgresql:///your-test-db
JWT_SECRET=your-secret
HASH=your-random-string
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
