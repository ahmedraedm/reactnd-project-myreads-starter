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
    // debugger
    BooksAPI.update(bookId, shelfName).then(() => {
      BooksAPI.getAll().then((Books) => {
        this.setState({ books: Books })
      })
      .then(() => {
        this.booksOnShelfId()
      })
    })
  }

  searchList(q) {
    debugger
    var booksArray = []
    q.map(function (query) {
      if (query !== '') {
        return BooksAPI.search(query).then((sBooks) => {
          debugger
          if (sBooks.length>0) {
            sBooks.map(function (book) {
              // debugger
              if (book.imageLinks && book.authors) {
                if (book.imageLinks.smallThumbnail && book.authors.length>0) {
                  return booksArray.push(book)
                }
              }
              //  debugger
            }.bind(this))
          }
        }).then(() => {
          // debugger
          this.setState({ searchBooks: booksArray })
        })
        // .catch(function () {
          //do nothing
        // })
      }

    }.bind(this))

  }

  componentDidMount() {
    BooksAPI.getAll().then((Books) => {
      this.setState({ books: Books })
      // debugger
    })
    .then(() => {
      // debugger
      this.booksOnShelfId()
    })

  }

  booksOnShelfId() {
    let booksId = []
    this.state.books.map(function (book) {
      // debugger
      return booksId.push(book.id)
    })
    this.setState({ allBooksOnShelfId: booksId })
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
            booksOnShlefId={this.state.allBooksOnShelfId}
            onShelfChange={this.shelfChange}
            books={this.state.books}

          />
        )} />
      </div>
    )
  }
}

export default BooksApp
