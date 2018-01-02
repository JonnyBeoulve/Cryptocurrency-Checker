import React, {Component } from 'react';
import axios from 'axios';

import Footer from './Footer';
import Header from './Header';
import Cryptos from './children/Cryptos';
import Search from './children/Search';

import SearchErrorImg from '../img/search_error.jpg';

class HomeContainer extends Component {
  /*======================================================================
  // This will hold the state of the cryptocurrency that
  // the user has searched for. It will be replaced with
  // Redux in a future update.
  ======================================================================*/
  constructor() {
    super();
    this.state = {
      cryptoList: [],
      displayTable: true
    };
  }
  /*====================================================================== 
  // Upon this MainContainer being mounted the getCryptos
  // function will be executed.
  ======================================================================*/
  componentDidMount() {
    this.listCryptos();
  }

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
  // This will render a list of cryptocurrencies.
  ======================================================================*/
  render() {
    return (
      <div className="homepage">
        <Header />
        <Search onSearch={this.searchCrypto} />
        {(this.state.displayTable)
            ? <Cryptos cryptosArray={this.state.cryptoList} />
        : <div className="search-error"><img src={SearchErrorImg} alt='' /><p>Woops!</p><p>No cryptocurrency with that name was found. Please enter the full name of the coin.</p></div> }
        <Footer />
      </div>
    )
  }
}

export default HomeContainer;