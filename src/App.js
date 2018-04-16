import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import BookShelf from './BookComponents/BookShelf';
import SearchBook from './BookComponents/SearchBook';
import './App.css';

class App extends Component {
  render() {
    return (
        <div>
            <Route exact path='/' render={() =>(
                //Render Book Shelf
                <BookShelf/>
            )}/>
            <Route exact path='/search' render={() =>(
                //Render SearchBook
                <SearchBook/>
            )}/>
        </div>
    );
  }
}

export default App;
