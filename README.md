# Py_Libary_Project
This is a web-based Library Management System created using Flask and SQLAlchemy. The system allows users to add, view, update, and delete book records, customer records, and loan records.

The code consists of two Python files: app.py, books.py. The app.py file includes all the routes and database models. The books.py file contains the SQLAlchemy models for the database tables.
And one JavaScript File The script.js file includes all the client-side JavaScript code that handles user interactions and sends requests to the server.

To run the application, you will need to install the required packages listed in requirements.txt. You can do this by running the following command:

pip install -r requirements.txt

To start the application, run the following command in the Terminal:

py app.py

This will start the Flask development server on port 5000. You can then access the system by opening a web browser and navigating to http://127.0.0.1:5000.

The application includes the following features:

Add, view, update, and delete book records
Add, view, update, and delete customer records
Add, view, and delete loan records
Search for books and customers by name
View a list of overdue books with their return dates
The system uses SQLite as its database backend. When you first start the application, it will create a new database file called books.sqlite3.

This project has provided a basic structure which can be expanded upon to create a more advanced library system.
