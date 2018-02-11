import React, { Component } from 'react';

/*======================================================== 
// The Search component is self-reliant, providing the
// HTML, which includes a form and button, to allow the
// user to perform a search for a given cryptocurrency.
========================================================*/
class Search extends Component {
  
  /*======================================================== 
  // Create a state of the search text that will be
  // altered as the user enters and removes letters from
  // the search form.
  ========================================================*/
  state = {
    searchText: ""
  }
  
  /*======================================================== 
  // Upon clicking the submit button, the search string
  // will have any whitespace converted to dashes, and it'll
  // be converted to lowercase. Following this, the search
  // string will be sent as an argument to the getCryptos
  // function in the HomeContainer.
  ========================================================*/
  handleSubmit = (e) => {
    e.preventDefault();
    let searchString = this.query.value;
    searchString = searchString.replace(/\s+/g, '-').toLowerCase();
    this.props.onSearch(searchString);
    e.currentTarget.reset();
  }
  
  /*======================================================== 
  // This will alter the state of the searchText above
  // as a user types in the search form.
  ========================================================*/
  onSearchChange = (e) => {
    this.setState({ searchText: e.target.value });
  }

  /*======================================================== 
  // This will render the forms necessary for user
  // interaction with the search methodologies in this file.
  ========================================================*/
  render() {  
    return (
      <form className="search-form" onSubmit={this.handleSubmit} >
        <input type="search" 
            onChange={this.onSearchChange}
            name="search" 
            ref={(input) => this.query = input}
            placeholder="Search/Follow currency"
            className="search-input" />
        <button type="submit" className="search-button">
          <svg fill="#79adc4" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </button>
      </form>   
    );
  }
}

export default Search;