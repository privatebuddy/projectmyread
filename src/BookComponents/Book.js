import React, { Component } from 'react'
import PropTypes from 'prop-types'
class Book extends Component {
    static propTypes = {
        onChangeShelf: PropTypes.func.isRequired,
    }

    loadBookImageData = (data) => {
        if(data.imageLinks)
        {
            return data.imageLinks.thumbnail;
        }else
        {
        }
    }

    loadBookAuthors = (data) => {

    }

    render() {
        const {bookData,onChangeShelf} = this.props
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 192,
                        backgroundImage: `url("${this.loadBookImageData(bookData)}")`
                    }}></div>
                    <div className="book-shelf-changer">
                        <select value={bookData.shelf} onChange={(event) => {
                            onChangeShelf(bookData,event.target.value)
                        }}>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{bookData.title}</div>
                <div className="book-authors">
                    {
                        bookData.authors && bookData.authors.map((author) =>
                            <div key={author}>
                                {author}
                            </div>)
                    }
                </div>
            </div>
        );
    }


}

export default Book