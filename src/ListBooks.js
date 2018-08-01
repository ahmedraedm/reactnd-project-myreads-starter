import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

class ListBooks extends Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    static propTypes = {
        onShelfChange: PropTypes.func.isRequired,
        books: PropTypes.array.isRequired
        }

    state = {
        // showSearchPage: false
    }

    handleChange = (e) => {
        let bookId = { id: e.target.id }
        let bookShelf = e.target.value
        if (this.props.onShelfChange) {
            this.props.onShelfChange(bookId, bookShelf)
        }
    }

    render() {
        let currentlyReadingBooks, wantToReadBooks, readBooks
        currentlyReadingBooks = this.props.books.filter(book => book.shelf === 'currentlyReading')
        wantToReadBooks = this.props.books.filter(book => book.shelf === 'wantToRead')
        readBooks = this.props.books.filter(book => book.shelf === 'read')

        return (
            <div className="app">
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Currently Reading</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {currentlyReadingBooks.map((book) => (
                                            <li key={book.id}>
                                                <div className="book">
                                                    <div className="book-top">
                                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                                        <div className="book-shelf-changer">
                                                            <select value={book.shelf} id={book.id} onChange={this.handleChange}>
                                                                <option value="move" disabled>Move to...</option>
                                                                <option value="currentlyReading">Currently Reading</option>
                                                                <option value="wantToRead">Want to Read</option>
                                                                <option value="read">Read</option>
                                                                <option value="none">None</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="book-title">{book.title}</div>
                                                    <div className="book-authors">{book.authors}</div>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Want to Read</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {wantToReadBooks.map((book) => (
                                            <li key={book.title}>
                                                <div className="book">
                                                    <div className="book-top">
                                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                                        <div className="book-shelf-changer">
                                                            <select value={book.shelf} id={book.id} onChange={this.handleChange}>
                                                                <option value="move" disabled>Move to...</option>
                                                                <option value="currentlyReading">Currently Reading</option>
                                                                <option value="wantToRead" >Want to Read</option>
                                                                <option value="read">Read</option>
                                                                <option value="none">None</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="book-title">{book.title}</div>
                                                    <div className="book-authors">{book.authors}</div>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Read</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {readBooks.map((book) => (
                                            <li key={book.title}>
                                                <div className="book">
                                                    <div className="book-top">
                                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                                        <div className="book-shelf-changer">
                                                            <select value={book.shelf} id={book.id} onChange={this.handleChange}>
                                                                <option value="move" disabled>Move to...</option>
                                                                <option value="currentlyReading">Currently Reading</option>
                                                                <option value="wantToRead">Want to Read</option>
                                                                <option value="read">Read</option>
                                                                <option value="none">None</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="book-title">{book.title}</div>
                                                    <div className="book-authors">{book.authors}</div>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="open-search">
                        <Link
                            to='/search'
                        >Add a book</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListBooks