import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'


class SearchBooks extends Component {

    static propTypes = {
        sBooksList: PropTypes.func.isRequired,
        onShelfChange: PropTypes.func.isRequired,
        searchBooks: PropTypes.array.isRequired,
        booksOnShlefId: PropTypes.array.isRequired
    }

    state = {
        query: '',
        queryBefore: '',
        queryArray: [],
        matchedBooks: false
    }

    handleChange = (e) => {
        // debugger
        let bookId = { id: e.target.id }
        let bookShelf = e.target.value
        if (this.props.onShelfChange) {
            this.props.onShelfChange(bookId, bookShelf)
        }
    }

    updateQuery = (queryString) => {
        // debugger
        let singleBook = []
        let queryArray = []
        var RegExpression = /^[a-zA-Z\s]*$/;
        if (RegExpression.test(queryString)) {
            console.log(queryString)
            singleBook = queryString.split(" ");
            for (var i = 0; i < singleBook.length; i++) {
                queryArray.push(singleBook[i]);
            }
            this.setState({ query: queryString })
            this.setState({ queryBefore: queryString })
            this.setState({ queryArray: queryArray })

            if (queryString.trim()) {
                this.props.sBooksList(queryArray)
                this.setState({ matchedBooks: true })
            } else {
                this.setState({ matchedBooks: false })
            }
        } else {
            alert('Please type letters or spaces only')
            this.setState({ query: this.state.queryBefore })
        }

    }

    render() {
        let booksList = this.props.searchBooks
        // debugger
        return (
            (
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link
                            to='/'
                            className='close-search'
                        >Close</Link>
                        <div className="search-books-input-wrapper">
                            {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
      
                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                      */}
                            <input
                                type="text"
                                placeholder="Search by title or author"
                                value={this.state.query}
                                onChange={(event) => this.updateQuery(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="search-books-results">
                        {this.state.matchedBooks ?
                            (<ol className="books-grid">
                                {booksList.map((book) => (
                                    (!this.props.booksOnShlefId.includes(book.id) ?
                                        <li key={book.id}>
                                            <div className="book">
                                                <div className="book-top">
                                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                                    <div className="book-shelf-changer">
                                                        <select defaultValue='none' id={book.id} onChange={this.handleChange}>
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
                                        : '')
                                ))}
                            </ol>) : ''}
                    </div>
                </div>
            )
        )
    }
}

export default SearchBooks 