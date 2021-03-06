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

Here is a video to show a quick overview of the key features:

https://user-images.githubusercontent.com/47775837/110219038-90ec6280-7ec5-11eb-811c-d397b4902d80.mp4

Register your own user, or use the test user:

**username**: testijamppa

**password**: TosiSalainen#1

For getting a feel for the sharing of organizations with other users, you can login with test users **tepi** and **jope** (the same password as above).

After you have logged in, go to the dashboard to manage your organizations. If you registered your own user, create a new organization.

Note: the idea behind organizations is that a user can create one or more organizations and then add available services/working spaces for each organization. With least one working space in an organization, a booking calendar for that organization will be available in the front end. 

So, when you have at least one organization, you can add services/spaces available for people to book. On the dashboard page, click "manage" below your organization and create a few services/spacse.

When you create a service/space, fill out the required information:

- name, 
- description, 
- opening hours (default 09:00 - 17:00), 
- timeslot (i.e. 30min, 60min, etc. Defaults to 30 mins) and 
- max bookings per timeslot (defaults to 1). 

After saving, head back to the dashboard and click "view calendar" below your organization. You now will see your service in the organization calendar (the UI is a bit clumsy still at this point as there is no link to the calendar in the service management page). 

Check out the [example calendar for our test user](https://space-booker.herokuapp.com/account/1/calendar) for reference of how the calendar looks like.

The calendar view should be fairly intuitive to use: 

- change the date from the "date" select 
- time slots in the past are not available 
- view information about a space/service by clicking on the info icon next to the title (here again the ui is still work in progress) 
- to make a booking, simply click on a timeslot and give an email address. After booking, the slot will be reserved.

After you have bookings in your spaces, you can manage them in the admin pages. You can also share your calendar with other users, giving them either admin role or regular user role.

New features to implement in the near future:

- an admin user can set an organization private such that only selected users can access the booking calendar
- an admin user can add images to services, which can be displayed in the front end
- improve the UI to make it responsive and also more intuitive
- a confirmation email is sent to users who have made bookings 
- when a booking occurs, a notification email is sent to organization admins 


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
