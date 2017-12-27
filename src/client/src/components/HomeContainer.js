import React, {Component } from 'react';
import axios from 'axios';

import TopCryptos from './children/TopCryptos';
import Search from './children/Search';

class HomeContainer extends Component {
  /*======================================================== 
  // This will hold the state of the cryptocurrency that
  // the user has searched for. It will be replaced with
  // Redux in a future update.
  ========================================================*/
  constructor() {
    super();
    this.state = {
      cryptoList: []
    };
  }
  /*======================================================== 
  // Upon this MainContainer being mounted the getCryptos
  // function will be executed.
  ========================================================*/
  componentDidMount() {
    this.getCryptos();
  }

  /*======================================================== 
  // This will send a GET request for cryptocurrency data.
  ========================================================*/
  getCryptos = (query) => {
    if (!query) {
      axios.get(`https://api.coinmarketcap.com/v1/ticker/?limit=100`)
      
      .then((res) => {
        this.setState( {cryptoList: res.data} )
        console.log(this.state.cryptoList);
      })
      .catch(err => {
        console.log('Error fetching and parsing data.', err)
      })
    } else {
      console.log(`Search isn't implemented yet due to CORS errors.`);
    }
  }


  /*======================================================================
  // This will render a list of cryptocurrencies.
  ======================================================================*/
  render() {
    return (
      <div className="crypto-list">
        <Search onSearch={this.getCryptos} />
        <TopCryptos cryptosArray={this.state.cryptoList} />
      </div>
    )
  }
}

export default HomeContainer;