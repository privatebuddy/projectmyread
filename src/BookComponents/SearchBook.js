import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from "../Utils/BooksAPI";
class SearchBook extends Component{
    state ={
        allBookList:[],
        userBookList:[],
        isResultFound:false
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then((userBookList) => {
                this.setState(() => ({
                    userBookList
                }))
            })
    }

    updateQuery = (event) => {

        BooksAPI.search(event).then((result) => {
            if(result && result.error)
            {
                this.setState({allBookList:[]});
                this.setState({isResultFound:false})
            }else if(result)
            {
                this.setState({allBookList:result});
                this.setState({isResultFound:true})
            }else
            {
                this.setState({allBookList:[]});
                this.setState({isResultFound:false})
            }
        }).then(this.updateBookState)
    }

    changeBookShelf = (book,shelf) =>
    {
        BooksAPI.update(book,shelf).then(this.updateValueOfBook(book.id,shelf)).then(this.updateAllBookData(this.state.allBookList))
    }

    updateValueOfBook = (BookID,shelf) => {
        const book = this.state.allBookList.find((b) => b.id === BookID);
        book.shelf = shelf;
        this.state.userBookList.push(book);
        // this.state.userBookList.push(this.state.allBookList.find((b) => b.id === BookID));
        // this.state.allBookList.find((b) => b.id === BookID).shelf = shelf;
    }

    updateAllBookData = (newBookList) => {
        this.setState({allBookList : newBookList});
    }

    updateBookState = () =>
    {
        this.state.allBookList.map((book) => {
            book.shelf = "none"
            this.state.userBookList.map((userBook) => {
                book.id === userBook.id ? (book.shelf = userBook.shelf) : book.shelf !== "none" ? (book.shelf === book.shelf):(book.shelf === "none")
            })
        });

        console.log(this.state.allBookList);
        this.setState({allBookList:this.state.allBookList});
    }

    render(){
        const {allBookList} = this.state;
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                               onChange={(event) => this.updateQuery(event.target.value)}
                               placeholder="Search by title or author"/>

                    </div>
                </div>
                {
                    this.state.isResultFound ?
                        (<div className="search-books-results">
                            <ol className="books-grid">
                                {allBookList.map((book) => (
                                    <li key={book.id}>
                                        <Book
                                            bookData={book}
                                            onChangeShelf={this.changeBookShelf}/>
                                    </li>))
                                }
                            </ol>
                        </div>)
                        :
                        (<div className="book-not-found">
                            <h1>Result not found</h1>
                        </div>)
                }
            </div>
        );
    }
}

export default SearchBook