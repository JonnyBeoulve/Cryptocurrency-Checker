import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import Footer from './Footer';
import Header from './Header';
import Cryptos from './children/Cryptos';
import Search from './children/Search';

class AccountContainer extends Component {
  /*======================================================================
  // This will send a GET request for a list of the top 100
  // cryptocurrencies sorted by marketshare size.
  ======================================================================*/
  listCryptos = () => {
    axios.get(`https://api.coinmarketcap.com/v1/ticker/?limit=100`)
    //axios.get(`/api/listcryptos`)
    
    .then((res) => {
      this.setState( {cryptoList: res.data, displayTable: true} )
    })
    .catch(err => {
      console.log('Error fetching and parsing data.', err)
    })
  }

  /*======================================================================
  // This will search for a cryptocurrency that matches the string
  // entered by the user.
  ======================================================================*/
  searchCrypto = (query) => {
    axios.get(`https://api.coinmarketcap.com/v1/ticker/${query}/`)
    //axios.get(`/api/searchcrypto`)
      
    .then((res) => {
      this.setState( {cryptoList: res.data, displayTable: true} )
    })
    .catch(err => {
      this.setState( {displayTable: false} )
      console.log('Error fetching and parsing data. This is likely caused by the search element not matching a coin name.', err)
    })
  }

  /*======================================================================
  // This will handle submission of the signout button.
  ======================================================================*/
  submitSignout = (e) => {
    e.preventDefault();
    this.props.onSignOut();
    console.log("SIGNED OUT");
  };

  /*======================================================================
  // This will display the user's username, a signout button, along
  // with the current values of any cryptocurrencies they are following.
  ======================================================================*/
  render() {
    return (
      <div className="account">
        <Header />
          <h2>Hello [ACCOUNT NAME]</h2>
          <Button className="signout" bsStyle="danger" bsSize="large" onClick={this.submitSignout} type="submit">Sign out</Button>
          <p>[List cryptocurrencies here]</p>
        <Footer />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onSignOut: () => dispatch({type: 'SIGNOUT'})
  };
}

export default connect(null, mapDispatchToProps)(AccountContainer);