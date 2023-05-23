import json
from flask import Flask, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///books.sqlite3'
app.config['SECRET_KEY'] = "random string"
CORS(app)

db = SQLAlchemy(app)

# Model
class Book(db.Model):
    id = db.Column('book_id', db.Integer, primary_key=True)
    book_name = db.Column(db.String(100))
    book_author = db.Column(db.String(50))
    book_year = db.Column(db.String(10))
    book_type = db.Column(db.String(200))

    def __init__(self, book_name, book_author, book_year, book_type):
        self.book_name = book_name
        self.book_author = book_author
        self.book_year = book_year
        self.book_type = book_type

    def to_dict(self):
        return {
            'id': self.id,
            'book_name': self.book_name,
            'book_author': self.book_author,
            'book_year': self.book_year,
            'book_type': self.book_type
        }

@app.route("/")
def hello_world():
    books_list = [book.to_dict() for book in Book.query.all()]
    json_data = json.dumps(books_list)
    return json_data

@app.route("/del/<id>", methods=['DELETE'])
def del_book(id=-1):
    book = db.get_or_404(Book, id)
    db.session.delete(book)
    db.session.commit()
    return {"delete": "success"}


@app.route("/upd/<id>", methods=['PUT'])
def upd_book(id=-1):
    book = Book.query.get(id)
    data = request.get_json()
    book.book_author = data['book_author']
    book.book_name = data['book_name']
    book.book_year = data['book_year']
    book.book_type = data['book_type']
    db.session.commit()
    return {"update": "success"}


@app.route('/new', methods=['POST'])
def new():
    data = request.get_json()
    book_name = data['book_name']
    book_author = data['book_author']
    book_year = data['book_year']
    book_type = data['book_type']

    new_book = Book(book_name, book_author, book_year, book_type)
    db.session.add(new_book)
    db.session.commit()
    return "A new record was created."

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
