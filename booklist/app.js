// book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// ui constructor
UI.prototype.addBookToList = function (book) {

    const list = document.getElementById('book-list')
    // create TR
    const row = document.createElement('tr')
    const saveToLs = function () {
        sessionStorage.setItem(book.isbn, JSON.stringify(book.title, book.author, book.isbn))
    }
    row.innerHTML =
        `<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>Success</td>`
    list.appendChild(row)
    saveToLs()
}

function UI() {
    const addBookToLs = function addBookToLs(title, author, isbn) {
        sessionStorage.setItem('book', JSON.stringify(title, author, isbn));
    }

// replace by form reset called by the create submit event listener
// UI.prototype.clearFields = function () {
//     document.getElementById('title').value = ""
//     document.getElementById('author').value = ""
//     document.getElementById('value').value = ""
// }
}

UI.prototype.clearList = function () {
    document.querySelector('#book-list').innerHTML = ""
    // sessionStorage.clear()
}

UI.prototype.clearLs = function () {
    sessionStorage.clear()
}

UI.prototype.showAlert = function (msg,className) {
    const div = document.createElement('div')
    div.className = `alert ${className}`
    div.appendChild(document.createTextNode(msg))
    //get parent
    const container = document.querySelector('.container')
    const table = document.querySelector('table')
    //insert alert
    container.insertBefore(div,table)

    //disappear after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').remove()
    },3000)
}

// event listeners
document.getElementById('book-form').addEventListener('submit',
    function (e) {
        // get form values
        const title = document.getElementById('title').value
        const author = document.getElementById('author').value
        const isbn = document.getElementById('isbn').value
        const form = document.getElementById('book-form')

        const book = new Book(title, author, isbn);

        const ui = new UI();

        // validate
        if (title === '' || author == '' || isbn === '') {
            // error alert
            ui.showAlert('Please fill in all fields','error');
            document.getElementById('book-form').reset()
        } else {
            ui.addBookToList(book);
            document.getElementById('book-form').reset()
        }

        e.preventDefault()
    }
)

document.getElementById('clear-list').addEventListener('click',
    function () {
        const ui = new UI();
        ui.clearList();
        ui.clearLs();
    }
)

