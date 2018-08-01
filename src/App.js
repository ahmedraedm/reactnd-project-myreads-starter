import React from 'react';
import ListBooks from './ListBooks'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {

  constructor() {
    super();
    this.shelfChange = this.shelfChange.bind(this);
    this.searchList = this.searchList.bind(this);
    this.booksOnShelfId = this.booksOnShelfId.bind(this)
  }

  state = {
    books: [],
    searchBooks: [],
    allBooksOnShelfId: []
  }

  shelfChange(bookId, shelfName) {
    debugger
    BooksAPI.update(bookId, shelfName).then(() => {
      BooksAPI.getAll().then((Books) => {
        this.setState({ books: Books })
      }).then(() => {
         this.booksOnShelfId()
      })
    })
  }

  // addToNewShelf(bookId, shelfName){

  // }

  searchList(q) {
    debugger
    console.log(q)
    BooksAPI.search(q).then((sBooks) => {
      // this.state.books.map(function (bookOnShelve) {
      //   debugger
      //   sBooks.map(function(item){
      //     if (item.id===bookOnShelve.id) {
      //     }
      //   })
      //     debugger
      //   console.log(sBooks)
      // })
      this.setState({ searchBooks: sBooks })

    })
  }

  componentDidMount() {
    BooksAPI.getAll().then((Books) => {
      this.setState({ books: Books })
      debugger
    }).then(()=>{
      this.booksOnShelfId()
    })

  }

  booksOnShelfId(){
    let booksId=[]
    this.state.books.map(function(book){
      debugger
      // console.log(book.id)
      return booksId.push(book.id)
    })
    this.setState({allBooksOnShelfId: booksId})    
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            onShelfChange={this.shelfChange}
          />
        )} />

        <Route exact path='/search' render={() => (
          <SearchBooks
            searchBooks={this.state.searchBooks}
            sBooksList={this.searchList}
            booksOnShlefId = {this.state.allBooksOnShelfId}
            onShelfChange={this.shelfChange}
            
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
