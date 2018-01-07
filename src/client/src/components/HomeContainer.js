import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';

import Footer from './Footer';
import Header from './Header';
import Cryptos from './children/Cryptos';
import Search from './children/Search';
import RegisterModal from './RegisterModal';
import SigninModal from './SigninModal';

import SearchErrorImg from '../img/search_error.jpg';

class HomeContainer extends Component {
  /*======================================================================
  // This will hold the state of the top 100 cryptocurrencies by default
  // along with what modals should be visible. It is updated by the 
  // Search functionality the find the data for a specific 
  // cryptocurrency.
  ======================================================================*/
  constructor() {
    super();
    this.state = {
      cryptoList: [],
      displaySigninModal: false,
      displayCryptoTable: true
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
      this.setState( {cryptoList: res.data, displayCryptoTable: true} )
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
      this.setState( {cryptoList: res.data, displayCryptoTable: true} )
    })
    .catch(err => {
      this.setState( {displayCryptoTable: false} )
      console.log('Error fetching and parsing data. This is likely caused by the search element not matching a coin name.', err)
    })
  }
  /*======================================================== 
  // Upon clicking Sign-in this will change the state to
  // display the login modal window.
  ========================================================*/
  handleShowModal = (e) => {
    this.props.onDisplaySignin();
  }

  /*======================================================================
  // This will render the page. All core functionality can be found below.
  ======================================================================*/
  render() {
    return (
      <div className="homepage">
        <Header signinModalShow={this.state.displaySigninModal} />
        <Search onSearch={this.searchCrypto} />
        {(!this.state.displaySigninModal)
            ? <Button bsStyle="primary" className="signin-register-btn" onClick={this.handleShowModal}>Sign in</Button>
            : <Button bsStyle="primary" className="signin-register-btn">Sign out</Button> }
        {(this.state.displayCryptoTable)
            ? <Cryptos cryptosArray={this.state.cryptoList} />
            : <div className="search-error"><img src={SearchErrorImg} alt='' /><p>Woops!</p><p>No cryptocurrency with that name was found. Please enter the full name of the coin.</p></div> }
        {(this.props.signinModalStatus)
            ? <SigninModal />
            : <p></p> }
        {(this.props.registerModalStatus)
            ? <RegisterModal />
            : <p></p> }
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    signedInStatus: state.signedInStatus.signedIn,
    signinModalStatus: state.signinModalStatus.displaySigninModal,
    registerModalStatus: state.registerModalStatus.displayRegisterModal
  };
}

const mapDispatchToProps = dispatch => {
  return {
      onDisplaySignin: () => dispatch({type: 'DISPLAY_SIGNIN_MODAL'})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);