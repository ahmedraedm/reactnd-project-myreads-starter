import React, { Component } from 'react';
import ListBooks from './ListBooks'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {
  state = {
    books:[]
  }

  componentDidMount() {
    BooksAPI.getAll().then((Books) => {
      this.setState({ books: Books })
      //  console.log(this.state.books)
    })}

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListBooks 
            books={this.state.books}
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
