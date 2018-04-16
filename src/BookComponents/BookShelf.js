import React, { Component } from 'react'
import Book from './Book'
import * as BooksAPI from '../Utils/BooksAPI'
import { Link } from 'react-router-dom'
class BookShelf extends Component{
    state ={
        bookList:[]
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then((bookList) => {
                this.setState(() => ({
                    bookList
                }))
            })
    }

    changeBookShelf = (book,shelf) =>
    {
        BooksAPI.update(book,shelf).then(this.updateValueOfBook(book.id,shelf)).then(this.updateAllBookData(this.state.bookList))
    }

    updateValueOfBook = (BookID,shelf) => {
        this.state.bookList.find((b) => b.id === BookID).shelf = shelf;
    }

    updateAllBookData = (newBookList) => {
        this.setState({bookList : newBookList});
    }


    render(){
        const currentReadBooks = this.state.bookList.filter((book) => { return book.shelf === "currentlyReading"});
        const wantToReadBooks = this.state.bookList.filter((book) => { return book.shelf === "wantToRead"});
        const alreadyReadBooks = this.state.bookList.filter((book) => { return book.shelf === "read"});

        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>My Reads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Current Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {currentReadBooks.map((book) => (
                                        <li key={book.id}>
                                            <Book
                                                  bookData={book}
                                                  onChangeShelf={this.changeBookShelf}/>
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
                                        <li key={book.id}>
                                            <Book
                                                  bookData={book}
                                                  onChangeShelf={this.changeBookShelf}/>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {alreadyReadBooks.map((book) => (
                                        <li key={book.id}>
                                            <Book
                                                bookData={book}
                                                onChangeShelf={this.changeBookShelf}/>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>

                </div>
                <Link to='/search'>
                    <div className="open-search">
                        <a >
                        add book
                        </a>
                    </div>
                </Link>

            </div>
        );
    }
}
export default BookShelf