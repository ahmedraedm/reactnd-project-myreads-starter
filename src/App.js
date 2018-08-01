import React, { Component } from 'react';
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
  }

  state = {
    books: [],
    searchBooks: []
  }

  shelfChange(bookId, shelfName) {
    BooksAPI.update(bookId, shelfName).then(() => {
      BooksAPI.getAll().then((Books) => {
        this.setState({ books: Books })
      })
    })
  }

  searchList(q){
    // debugger
    console.log(q)
    BooksAPI.search(q).then((sBooks) => {
      // debugger
      console.log(sBooks)
      this.setState({ searchBooks: sBooks })
    })
  }

  componentDidMount() {
    BooksAPI.getAll().then((Books) => {
      this.setState({ books: Books })
    })
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
            sBooksList = {this.searchList}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
