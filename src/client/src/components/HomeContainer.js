import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';

import CryptoDetailsModal from './CryptoDetailsModal';
import Footer from './Footer';
import Header from './Header';
import Cryptos from './children/Cryptos';
import RegisterModal from './RegisterModal';
import Search from './children/Search';
import SigninModal from './SigninModal';

class HomeContainer extends Component {
  /*======================================================================
  // This will hold the state of the top 100 cryptocurrencies that are
  // received from a GET request in the listCryptos function below,
  // the data for a specific crypto that is received from a GET request
  // in the searchCrypto function below, along with whether or not
  // to show a loading circle during a GET request.
  ======================================================================*/
  constructor() {
    super();
    this.state = {
      cryptoList: [],
      searchCrypto: [],
      loading: true,
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
      loading: true
    });
    axios.get(`https://api.coinmarketcap.com/v1/ticker/?limit=100`)
    //axios.get(`/api/listcryptos`)
    
    .then((res) => {
      this.setState({
        cryptoList: res.data, 
        loading: false, 
      })
    })
    .catch(err => {
      this.setState({
        loading: false
      })
      console.log('Error fetching and parsing data.', err)
    })
  }

  /*======================================================================
  // This will search for a cryptocurrency that matches the string
  // entered by the user. Upon a search being submitted any open modals
  // will be closed before a GET request is sent. If successful,
  // a CryptoDetailsModal will show, displaying data for a specific
  // cryptocurrency.
  ======================================================================*/
  searchCrypto = (query) => {
    this.props.onHideSignin();
    this.props.onHideRegister();
    this.setState({
      loading: true,
      searchCrypto: ''
    });
    axios.get(`https://api.coinmarketcap.com/v1/ticker/${query}/`)
    //axios.get(`/api/searchcrypto`)
      
    .then((res) => {
      this.setState({
        loading: false, 
        searchCrypto: res.data[0]
      })
      this.props.onDisplayDetails();
    })
    .catch(err => {
      this.setState({
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

  /*======================================================================
  // Upon clicking the X on the top right of the modal, the modal
  // will close.
  ======================================================================*/
  handleCloseSigninModal = (e) => {
    this.props.onHideSignin();
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
  // Display crypto table will list either the top 100 cryptocurrencies.
  // Loading will display a loading circle when a GET request is 
  // underway. Display signin modal will pop up a login/registration 
  // modal when the signin button on the top right  of the page is clicked.
  ======================================================================*/
  render() {
    return (
      <div className="homepage">
        <Header signinModalShow={this.state.displaySigninModal} />
        <Search onSearch={this.searchCrypto} />
        {(!this.props.signedInStatus)
            ? <Button bsStyle="primary" className="signin-register-btn" onClick={this.handleShowModal}>Sign in</Button>
            : <Button bsStyle="primary" className="signin-register-btn" onClick={this.handleSignout}>Sign out</Button> }
        {(this.state.loading)
            ? <div className="loader"></div>
            : <Cryptos cryptosArray={this.state.cryptoList} /> }
        {(this.props.detailsModalStatus)
            ? <CryptoDetailsModal selectedCrypto={this.state.searchCrypto} />
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
    detailsModalStatus: state.detailsModalStatus.displayDetailsModal,
    signedInStatus: state.signedInStatus.signedIn,
    signinModalStatus: state.signinModalStatus.displaySigninModal,
    registerModalStatus: state.registerModalStatus.displayRegisterModal
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onDisplayDetails: () => dispatch({type: 'DISPLAY_DETAILS_MODAL'}),
    onDisplaySignin: () => dispatch({type: 'DISPLAY_SIGNIN_MODAL'}),
    onHideRegister: () => dispatch({type: 'HIDE_REGISTER_MODAL'}),
    onHideSignin: () => dispatch({type: 'HIDE_SIGNIN_MODAL'}),
    onSignout: () => dispatch({type: 'SIGNOUT'})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);