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

  }

  state = {
    bookss: [],
  }

  shelfChange(bookId, shelfName) {
    BooksAPI.update(bookId, shelfName).then(() => {
      BooksAPI.getAll().then((Books) => {
        this.setState({ bookss: Books })
      })
    })
  }

  componentDidMount() {
    BooksAPI.getAll().then((Books) => {
      this.setState({ bookss: Books })
      //  console.log(this.state.books)
    })
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.bookss}
            onShelfChange={this.shelfChange}
          />
        )} />

        <Route exact path='/search' render={() => (
          <SearchBooks />
        )} />
      </div>
    )
  }
}

export default BooksApp
