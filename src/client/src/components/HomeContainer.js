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
      displaySearchError: false,
      displaySigninModal: false,
      displayCryptoTable: true,
      loading: true
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
    this.setState({
      displayCryptoTable: false, 
      displaySearchError: false, 
      loading: true
    });
    axios.get(`https://api.coinmarketcap.com/v1/ticker/?limit=100`)
    //axios.get(`/api/listcryptos`)
    
    .then((res) => {
      this.setState({
        cryptoList: res.data, 
        loading: false, 
        displayCryptoTable: true
      })
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
    this.setState({
      displayCryptoTable: false, 
      displaySearchError: false, 
      loading: true
    });
    axios.get(`https://api.coinmarketcap.com/v1/ticker/${query}/`)
    //axios.get(`/api/searchcrypto`)
      
    .then((res) => {
      this.setState({
        cryptoList: res.data, 
        loading: false, 
        displayCryptoTable: true
      })
    })
    .catch(err => {
      this.setState({
        displaySearchError: true, 
        loading: false
      })
      console.log('Error fetching and parsing data. This is likely caused by the search element not matching a coin name.', err)
    })
  }

  /*======================================================== 
  // Upon clicking Sign out this will change the state to
  // display the login modal window.
  ========================================================*/
  handleShowModal = (e) => {
    this.props.onHideRegister();
    this.props.onDisplaySignin();
  }

  /*======================================================== 
  // Upon clicking Sign out this will sign the user out.
  ========================================================*/
  handleSignout = (e) => {
    this.props.onSignout();
  }

  /*======================================================================
  // This will render the page. All core functionality can be found below.
  // Display signing modal will alter between a sign in an sign out
  // button depending on whether or not the user is signed in.
  // Display crypto table will list either the top 100 cryptocurrencies or
  // a specifically searched for cryptocurrency in table format. Display
  // search error will notify the user that the cryptocurrency name they
  // typed in couldn't be found. Loading will display a loading circle
  // when a GET request is underway. Display signin modal will pop up a 
  // login/registration modal when the signin button on the top right 
  // of the page is clicked.
  ======================================================================*/
  render() {
    return (
      <div className="homepage">
        <Header signinModalShow={this.state.displaySigninModal} />
        <Search onSearch={this.searchCrypto} />
        {(!this.props.signedInStatus)
            ? <Button bsStyle="primary" className="signin-register-btn" onClick={this.handleShowModal}>Sign in</Button>
            : <Button bsStyle="primary" className="signin-register-btn" onClick={this.handleSignout}>Sign out</Button> }
        {(this.state.displayCryptoTable)
            ? <Cryptos cryptosArray={this.state.cryptoList} />
            : <p></p> }
        {(this.state.displaySearchError)
            ? <div className="search-error"><img src={SearchErrorImg} alt='' /><p>Woops!</p><p>No cryptocurrency with that name was found. Please enter the full name of the coin.</p></div>
            : <p></p> }
        {(this.state.loading)
            ? <div className="loader"></div>
            : <p></p> }
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
    onSignout: () => dispatch({type: 'SIGNOUT'}),
    onDisplaySignin: () => dispatch({type: 'DISPLAY_SIGNIN_MODAL'}),
    onHideRegister: () => dispatch({type: 'HIDE_REGISTER_MODAL'})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);