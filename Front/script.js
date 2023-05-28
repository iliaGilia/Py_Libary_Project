const MY_SERVER = "http://127.0.0.1:5000";

const loadData = async () => {
  const booksResponse = await axios.get(`${MY_SERVER}/books`);
  const customersResponse = await axios.get(`${MY_SERVER}/customers`);
  const loansResponse = await axios.get(`${MY_SERVER}/loans`);

  const booksData = booksResponse.data;
  const customersData = customersResponse.data;
  const loansData = loansResponse.data;

  displayBooks(booksData);
  displayCustomers(customersData);
  displayLoans(loansData);
};

const displayBooks = (booksData) => {
  const booksDiv = document.getElementById('Books');
  booksDiv.innerHTML = '';
  booksData.forEach(book => {
    const bookDiv = createBookDiv(book);
    booksDiv.appendChild(bookDiv);
  });
};

const displayCustomers = (customersData) => {
  const customersDiv = document.getElementById('Customers');
  customersDiv.innerHTML = '';
  customersData.forEach(customer => {
    const customerDiv = createCustomerDiv(customer);
    customersDiv.appendChild(customerDiv);
  });
};

const displayLoans = (loansData) => {
  const loansDiv = document.getElementById('Loans');
  loansDiv.innerHTML = '';
  loansData.forEach(loan => {
    const loanDiv = createLoanDiv(loan);
    loansDiv.appendChild(loanDiv);
  });
};

const createBookDiv = (book) => {
  const bookDiv = document.createElement('div');
  bookDiv.innerHTML = `
    <p>Book ID: ${book.id}, Author: ${book.book_author}, Name: ${book.book_name}, Year: ${book.book_year}, Type: ${book.book_type}</p>
    <button onclick="deleteBook(${book.id})">Delete</button>
    <button onclick="updateBook(${book.id})">Update</button>
  `;
  return bookDiv;
};

const createCustomerDiv = (customer) => {
  const customerDiv = document.createElement('div');
  customerDiv.innerHTML = `
    <p>Customer ID: ${customer.id}, Name: ${customer.cust_name}, City: ${customer.cust_city}, Age: ${customer.cust_age}</p>
    <button onclick="deleteCustomer(${customer.id})">Delete</button>
    <button onclick="updateCustomer(${customer.id})">Update</button>
  `;
  return customerDiv;
};

const createLoanDiv = (loan) => {
  const loanDiv = document.createElement('div');
  loanDiv.innerHTML = `
    <p>Loan ID: ${loan.id}, Customer ID: ${loan.cust_id}, Book ID: ${loan.book_id}, Loan Date: ${loan.loanDate}, Return Date: ${loan.returnDate}</p>
    <button onclick="deleteLoan(${loan.id})">Return</button>
    <button onclick="updateLoan(${loan.id})">Update</button>
  `;
  return loanDiv;
};

const newBook = async () => {
  const author = document.getElementById('author').value;
  const bookName = document.getElementById('book_name').value;
  const bookYear = document.getElementById('book_year').value;
  const bookType = document.getElementById('book_type').value; 

  // Validate book_author
  if (author === '') {
    alert('Author name cannot be empty.');
    return;
  }

  if (!/^[A-Za-z\s.]+$/.test(author)) {
    alert('Author name should only contain letters, spaces, dots, and symbols.');
    return;
  }

  // Validate book_name
  if (bookName === '') {
    alert('Book name cannot be empty.');
    return;
  }

  // Validate book_year
  if (bookYear === '') {
    alert('Book year cannot be empty.');
    return;
  }

  if (isNaN(bookYear) || bookYear.length >= 5) {
    alert('Invalid book year.');
    return;
  }

  const newBookData = {
    book_author: author,
    book_name: bookName,
    book_year: bookYear,
    book_type: bookType
  };

  await axios.post(`${MY_SERVER}/books/new`, newBookData);
  loadData();
};

const newCustomer = async () => {
  const custName = document.getElementById('cust_name').value;
  const custCity = document.getElementById('cust_city').value;
  const custAge = document.getElementById('cust_age').value;

  // Validate cust_name
  if (custName === '') {
    alert('Customer name cannot be empty.');
    return;
  }

  if (!/^[A-Za-z]+$/.test(custName)) {
    alert('Customer name should only contain letters.');
    return;
  }

  // Validate cust_city
  if (custCity === '') {
    alert('Customer city cannot be empty.');
    return;
  }

  if (!/^[A-Za-z,-. ]+$/.test(custCity)) {
    alert('Customer city should only contain letters, hyphens (-), commas (,), periods (.) and spaces.');
    return;
}

  // Validate cust_age
  if (custAge === '') {
    alert('Customer age cannot be empty.');
    return;
  }

  if (isNaN(custAge) || custAge < 0 || custAge >= 100) {
    alert('Invalid customer age. Age should be a number less than 100.');
    return;
  }

  const newCustomerData = {
    cust_name: custName,
    cust_city: custCity,
    cust_age: custAge
  };

  await axios.post(`${MY_SERVER}/customers/new`, newCustomerData);
  loadData();
};

const newLoan = async () => {
  const custId = document.getElementById('loan_cust_id').value;
  const bookId = document.getElementById('loan_book_id').value;

  // Fetch book data from the server
  const bookResponse = await axios.get(`${MY_SERVER}/books/${bookId}`);
  const bookType = bookResponse.data.book_type;
  

  const newLoanData = {
    cust_id: custId,
    book_id: bookId,
    book_type: bookType
  };

  await axios.post(`${MY_SERVER}/loans/new`, newLoanData);
  loadData();
};

const deleteBook = async (id) => {
  await axios.delete(`${MY_SERVER}/books/del/${id}`);
  loadData();
};

const deleteCustomer = async (id) => {
  await axios.delete(`${MY_SERVER}/customers/del/${id}`);
  loadData();
};

const deleteLoan = async (id) => {
  await axios.delete(`${MY_SERVER}/loans/del/${id}`);
  loadData();
};

const updateBook = async (id) => {
    const author = document.getElementById('author').value;
    const bookName = document.getElementById('book_name').value;
    const bookYear = document.getElementById('book_year').value;
    const bookType = document.getElementById('book_type').value;
    if (author === '') {
      alert('Author name cannot be empty.');
      return;
    }
  
    if (!/^[A-Za-z]+$/.test(author)) {
      alert('Author name should only contain letters.');
      return;
    }
  
    // Validate book_name
    if (bookName === '') {
      alert('Book name cannot be empty.');
      return;
    }
  
    if (!/^[A-Za-z]+$/.test(bookName)) {
      alert('Book name should only contain letters.');
      return;
    }
  
    // Validate book_year
    if (bookYear === '') {
      alert('Book year cannot be empty.');
      return;
    }
  
    if (isNaN(bookYear) || bookYear.length >= 5) {
      alert('Invalid book year. Year should be a 4-digit number.');
      return;
    }
  
    const updatedBookData = {
      book_author: author,
      book_name: bookName,
      book_year: bookYear,
      book_type: bookType
    };
  
    await axios.put(`${MY_SERVER}/books/upd/${id}`, updatedBookData);
    loadData();
  };
  
  const updateCustomer = async (id) => {
    const custName = document.getElementById('cust_name').value;
    const custCity = document.getElementById('cust_city').value;
    const custAge = document.getElementById('cust_age').value;

    // Validate cust_name
  if (custName === '') {
    alert('Customer name cannot be empty.');
    return;
  }

  if (!/^[A-Za-z]+$/.test(custName)) {
    alert('Customer name should only contain letters.');
    return;
  }

  // Validate cust_city
  if (custCity === '') {
    alert('Customer city cannot be empty.');
    return;
  }

  if (!/^[A-Za-z]+$/.test(custCity)) {
    alert('Customer city should only contain letters.');
    return;
  }

  // Validate cust_age
  if (custAge === '') {
    alert('Customer age cannot be empty.');
    return;
  }

  if (isNaN(custAge) || custAge < 0 || custAge >= 100) {
    alert('Invalid customer age. Age should be a number less than 100.');
    return;
  }
  
    const updatedCustomerData = {
      cust_name: custName,
      cust_city: custCity,
      cust_age: custAge
    };
  
    await axios.put(`${MY_SERVER}/customers/upd/${id}`, updatedCustomerData);
    loadData();
  };
  
  const updateLoan = async (id) => {
    const custId = document.getElementById('loan_cust_id').value;
    const bookId = document.getElementById('loan_book_id').value;
    const bookType = document.getElementById('loan_book_type').value;
  
    let loanDate, returnDate;
  
    if (bookType === '1') {
      returnDate = new Date();
      returnDate.setDate(returnDate.getDate() + 2);
    } else if (bookType === '2') {
      returnDate = new Date();
      returnDate.setDate(returnDate.getDate() + 5);
    } else if (bookType === '3') {
      returnDate = new Date();
      returnDate.setDate(returnDate.getDate() + 10);
    } else {
      console.log('Invalid book type.');
      return;
    }
  
    loanDate = new Date(); // Set loanDate to current date
  
    const updatedLoanData = {
      cust_id: custId,
      book_id: bookId,
      book_type: bookType,
      loanDate: loanDate.toISOString().split('T')[0],
      returnDate: returnDate.toISOString().split('T')[0]
    };
  
    await axios.put(`${MY_SERVER}/loans/upd/${id}`, updatedLoanData);
    loadData();
  };
  
  const showBooks = () => {
    const dataDisplayDiv = document.getElementById('DataDisplay');
    dataDisplayDiv.innerHTML = '';
    const booksDiv = document.getElementById('Books');
    dataDisplayDiv.innerHTML = booksDiv.innerHTML;
};

const showCustomers = () => {
    const dataDisplayDiv = document.getElementById('DataDisplay');
    dataDisplayDiv.innerHTML = '';
    const customersDiv = document.getElementById('Customers');
    dataDisplayDiv.innerHTML = customersDiv.innerHTML;
};

const showLoans = () => {
    const dataDisplayDiv = document.getElementById('DataDisplay');
    dataDisplayDiv.innerHTML = '';
    const loansDiv = document.getElementById('Loans');
    dataDisplayDiv.innerHTML = loansDiv.innerHTML; 
};

const showSection = (section) => {
  const dataDisplayDiv = document.getElementById('DataDisplay');
  dataDisplayDiv.innerHTML = '';

  const booksSection = document.getElementById('BooksSection');
  const customersSection = document.getElementById('CustomersSection');
  const loansSection = document.getElementById('LoansSection');

  if (section === 'Books') {
    dataDisplayDiv.innerHTML = booksSection.innerHTML;
  } else if (section === 'Customers') {
    dataDisplayDiv.innerHTML = customersSection.innerHTML;
  } else if (section === 'Loans') {
    dataDisplayDiv.innerHTML = loansSection.innerHTML;
  }
};
  
const updateData = () => {
  loadData();
};

const searchBooks = async () => {
  const searchQuery = document.getElementById('searchBookInput').value;
  const searchResponse = await axios.get(`${MY_SERVER}/books/search/${searchQuery}`);
  const searchResultsDiv = document.getElementById('bookSearchResults');
  searchResultsDiv.innerHTML = '';
  searchResponse.data.forEach(book => {
      const bookDiv = createBookDiv(book);
      searchResultsDiv.appendChild(bookDiv);
  });
};

const searchCustomers = async () => {
  const searchQuery = document.getElementById('searchCustomerInput').value;
  const searchResponse = await axios.get(`${MY_SERVER}/customers/search/${searchQuery}`);
  const searchResultsDiv = document.getElementById('customerSearchResults');
  searchResultsDiv.innerHTML = '';
  searchResponse.data.forEach(customer => {
      const customerDiv = createCustomerDiv(customer);
      searchResultsDiv.appendChild(customerDiv);
  });
};

const showOverdueBooksBtn = document.getElementById('show-overdue-books-btn');

// add a click event listener to the button
showOverdueBooksBtn.addEventListener('click', showOverdueBooks);

// define the showOverdueBooks function
function showOverdueBooks() {
  const overdueBooksContainer = document.getElementById('overdue-books-container');

  // toggle container visibility
  overdueBooksContainer.style.display = overdueBooksContainer.style.display === 'none' ? 'block' : 'none';

  // if the container is invisible, fetch the overdue books
  if (overdueBooksContainer.style.display === 'none') {
    return;
  }

  axios.get(`${MY_SERVER}/books-overdue`)
    .then(response => {
      let html = '';
      response.data.forEach(book => {
        html += `<div class="book">
                    <h3>${book.book_name}</h3>
                    <p>Author: ${book.book_author}</p>
                    <p>Book ID: ${book.book_id}</p>
                    <p>Customer ID: ${book.cust_id}</p>
                    <p>Return Date: ${book.returnDate}</p>
                  </div>`;
      });

      overdueBooksContainer.innerHTML = html;
    })
    .catch(error => console.error('Error:', error));
}
// create a new container for the list of overdue books
const container = document.createElement('div');
container.id = 'overdue-books-container';
document.body.appendChild(container);

// Call the loadData function to fetch and display initial data
loadData();
