# Py_Library_Project
This is a web-based Library Management System created using Flask and SQLAlchemy. The system allows users to add, view, update, and delete book records, customer records, and loan records.

## Project Structure

The project consists of the following files:

app.py: This file contains all the routes and database models for the application.  
books.py: This file includes the SQLAlchemy models for the database tables.  
script.js: This JavaScript file handles client-side interactions and sends requests to the server.  

## Getting Started

To run the application, follow these steps:  

1. Create a Virtual Environment by running this commands in the terminal:

    To create the Virtual Environment-  

           py -3 -m venv env   

    To activate it-  

           .\env\Scripts\activate

       

2. Install the required packages listed in requirements.txt by running the following command:

       pip install -r requirements.txt

3. Start the application by running the following command in the terminal:

       py app.py  
       
    This will start the Flask development server on port 5000.

This will start the Flask development server on port 5000. You can then access the system by opening a web browser and navigating to http://127.0.0.1:5000.

<br>
4. Open a web browser and navigate to http://127.0.0.1:5000 to access the Library Management System.

<style>
.custom-list {
  list-style-type: none;
}
.custom-list li::before {
  content: "• ";
}
</style>

## Features

The application includes the following features:

- Add, view, update, and delete book records.
- Add, view, update, and delete customer records.
- Add, view, and delete loan records.
- Search for books and customers by name.
- View a list of overdue books with their return dates.

The system uses SQLite as its database backend. When you first start the application, it will create a new database file called `books.sqlite3`.

## Examples

You can view a live demo of the application hosted on GitHub Pages [here](https://syltras.github.io/Library_front/). The back-end code can be found in the [Library_back](https://github.com/Syltras/Library_back) repository, and the front-end code is available in the [Library_front](https://github.com/Syltras/Library_front) repository.

Feel free to explore the demo and the repositories to see the project in action and learn more about its implementation.

## Expansion

This project provides a basic structure that can be expanded upon to create a more advanced library system. You can build upon the existing features and add new functionality as per your requirements.

We appreciate your interest and welcome any contributions or feedback you may have. Enjoy working with the Py_Library_Project!
