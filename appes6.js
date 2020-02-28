// Book class
class Book{
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI class
class UI{
  addBookToList(book){
    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `
    list.appendChild(row);
    console.log(row);
  }
  
  showAlert(msg, msgClass){
    const div = document.createElement('div');
    div.className = `alert ${msgClass}`;
    div.innerHTML = `${msg}`;
  
    // Another way
    // div.appendChild(document.createTextNode(msg));
  
    // Get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    
    // Timeout after 3 seconds
    setTimeout(() => {
      div.remove();
      // document.querySelector('.alert').remove();
    }, 3000);
  }
  
  deleteBook(target){
    if (target.className='delete'){
      target.parentElement.parentElement.remove();
    }
  }
  
  clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// Local Storage Class - to store to local storage
class Store {
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks(){
    const books = Store.getBooks();
    books.forEach(book => {
      const ui = new UI;
      ui.addBookToList(book);
    });
  }

  static addBook(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    
  }

  // Remove by ISBN
  static removeBook(isbn){
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn){
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// DOM Load event - load all the books from the local storage if any present
document.addEventListener('DOMContentLoaded', Store.displayBooks());

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function(e){
  // Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  const book = new Book(title, author, isbn);
  
  const ui = new UI();

  // Validate
  if(title ==='' || author ==='' || isbn ===''){
    // Error alert
    ui.showAlert('Please Fill in all the fields','error');
    
  } else {
    // Add book to list;
    ui.addBookToList(book);

    // Add to local storage
    Store.addBook(book);

    // Clear fields
    ui.clearFields();

    // Success alert
    ui.showAlert('The book has been successfully added','success');
  }

  e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
  const ui = new UI();
  
  // Delete book
  ui.deleteBook(e.target);

  // Remove from Local Storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

  // Show message
  ui.showAlert('Book Deleted!','success');

  e.preventDefault();
});