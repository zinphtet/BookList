
//Book class /Represents a book

class Book{
    constructor(title,author,isbn){
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

//UI Class: Handle UI Tasks
class UI{
    static displayBooks(){
        const storedBooks=Store.getBooks()

        storedBooks.forEach((book)=>UI.addBookToList(book))
    }


    static addBookToList(book){
        const list= document.getElementById('table')
        const row = document.createElement('tr')

        row.innerHTML = `
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                        <td><button class="delete">X</button></td> 
                                                     `   ;

          list.appendChild(row)
    }

    static clearFields(){
        document.getElementById('title').value=''
       document.getElementById('author').value=''
        document.getElementById('isbn').value=''
    
    }
  
    static deleteBook(e){
     if(e.classList.contains('delete')){
       e.parentElement.parentElement.remove();
     }
    }
}

class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')==null){
            books =[]
        }else{
            books = JSON.parse(localStorage.getItem('books'))
        }

        return books;
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book)
        localStorage.setItem('books',JSON.stringify(books))
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book,index)=>{
            if(book.isbn==isbn){
                books.splice(index,1)
            }
        })
        localStorage.setItem('books',JSON.stringify(books))
    }
}
//Add Book

document.getElementById('inForm').addEventListener('submit',(e)=>{
    e.preventDefault();

    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const isbn = document.getElementById('isbn').value

    if(title !=''&& author!=''&& isbn !=''){
        const book = new Book(title,author,isbn)

        //Display
        UI.addBookToList(book)
    
        //Store add Book
        Store.addBook(book)
        //clear Fields
        UI.clearFields()
    }else{
        alert('Fill in all fields')
    }
  
})

//DIsplay Books
document.addEventListener('DOMContentLoaded',UI.displayBooks)

//Delete Books

document.getElementById('table').addEventListener('click',(e)=>{
    UI.deleteBook(e.target)
    //Remove form localstorage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    alert('item removed')
})