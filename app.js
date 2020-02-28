// Book Constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI(book){}

// Add book to list
UI.prototype.addBookToList = function(book){
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

// Show alert
UI.prototype.showAlert = function(msg, msgClass){
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

UI.prototype.deleteBook = function(target){
  if (target.className='delete'){
    target.parentElement.parentElement.remove();
  }
}

// Clear UI fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

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

  // Show message
  ui.showAlert('Book Deleted!','success');

  e.preventDefault();
});