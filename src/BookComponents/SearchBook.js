import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from "../Utils/BooksAPI";
class SearchBook extends Component{
    state ={
        allBookList:[],
    }

    updateQuery = (event) => {
        BooksAPI.search(event).then((result) => {
            if(result && result.error)
            {

            }else if(result)
            {
                this.setState({allBookList:result});
            }else
            {
                this.setState({allBookList:[]});
            }
        })
    }

    changeBookShelf = (book,shelf) =>
    {
        BooksAPI.update(book,shelf);
    }

    render(){
        const {allBookList} = this.state
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
                <div className="search-books-results">
                    <ol className="books-grid">
                        {allBookList.map((book) => (
                            <li key={book.id}>
                                <Book
                                    bookData={book}
                                    onChangeShelf={this.changeBookShelf}/>
                            </li>))
                        }
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchBook