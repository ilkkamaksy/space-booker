# Spaces Booking App

This app is for booking working spaces such as meeting rooms or work stations.  

## Install backend

1. Start up development environment

```$ python3 -m venv venv```

followed with

```$ source venv/bin/activate```

2. Install dependencies

```(venv) $ pip install -r requirements.txt```

3. Define environment variables

Create an `.env` file and add the following environment variables:

```
DATABASE_URL=postgresql:///your-db 
DATABASE_URL_TEST=postgresql:///your-test-db
```

## Run backend

Start up the backend with

```(venv) $ python run.py```




