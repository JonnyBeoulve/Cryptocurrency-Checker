import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';

import CryptoDetailsModal from '../components/CryptoDetailsModal';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Cryptos from '../components/children/Cryptos';
import RegisterModal from '../components/RegisterModal';
import Search from '../components/children/Search';
import SigninModal from '../components/SigninModal';

import { slideInDown } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

/*======================================================== 
// Animated styles using Aphrodite and React Animations.
========================================================*/
const styles = StyleSheet.create({
  slideInDown: {
    animationName: slideInDown,
    animationDuration: '.5s'
  }
})

class HomeContainer extends Component {
  /*======================================================================
  // This will hold the state of the top 100 cryptocurrencies that are
  // received from a GET request in the listCryptos function below,
  // the data for a specific crypto that is received from a GET request
  // in the searchCrypto function below, along with whether or not
  // to show a loading circle when a transaction is happening.
  ======================================================================*/
  constructor() {
    super();
    this.state = {
      cryptoList: [],
      searchCrypto: [],
      loading: true
    };
  }

  /*====================================================================== 
  // Upon this MainContainer being mounted the listCryptos function will 
  // be executed.
  ======================================================================*/
  componentDidMount() {
    this.checkSession();
    this.listCryptos();
  }

  /*======================================================================
  // This will determine whether or not the user has a session upon
  // first arriving at the website. Set state to logged in if true.
  ======================================================================*/
  checkSession = () => {
    axios.get(`/account/checksession`)
    
    .then((res) => {
      if(res.data === true) {
        this.props.onSignin();
      }
    })
    .catch(err => {
      console.log('Error fetching session data from server.', err)
    })
  }

  /*======================================================================
  // This will send a GET request to the database to determine the
  // user's followed cryptocurrency before executing the searchCrypto
  // function with the name of the crypto.
  ======================================================================*/
  getFollowedCrypto = () => {
    axios.get(`/account/user`)
    
    .then((res) => {
      this.searchCrypto(res.data);
    })
    .catch(err => {
      console.log('Error fetching user data on server.', err)
    })
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
    .catch((err) => {
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
  // cryptocurrency. To start, we will replace any spaces in the query
  // with hypens to ensure the GET request succeeds.
  ======================================================================*/
  searchCrypto = (query) => {
    this.props.onHideSignin();
    this.props.onHideRegister();

    var queryString = query;
    queryString = queryString.replace(/\s+/g, '-').toLowerCase();

    axios.get(`https://api.coinmarketcap.com/v1/ticker/${queryString}/`)
    //axios.get(`/api/searchcrypto`)
      
    .then((res) => {
      this.setState({
        searchCrypto: res.data[0]
      })
      this.props.onDisplayDetails();
    })
    .catch((err) => {
      this.props.onDisplayDetails();
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
        <div className="header">
        {(this.props.signedInStatus)
            ? <Button bsStyle="primary" className="signin-register-btn" onClick={this.getFollowedCrypto}>Followed Crypto</Button>
            : <Button bsStyle="primary" className="signin-register-btn" onClick={this.handleShowModal}>Sign in</Button> }
          <Header signinModalShow={this.state.displaySigninModal} />
          <Search onSearch={this.searchCrypto} />
        </div>
        {(this.state.loading)
            ? <div className="loader"></div>
            : <Cryptos cryptosArray={this.state.cryptoList} /> }
        {(this.props.detailsModalStatus)
            ? <CryptoDetailsModal selectedCrypto={this.state.searchCrypto} />
            : <p></p> }
        {(this.props.signinModalStatus)
            ? <SigninModal msg={this.state.message} />
            : <p></p> }
        {(this.props.registerModalStatus)
            ? <RegisterModal msg={this.state.message} />
            : <p></p> }
        {(this.props.messageStatus)
            ? <div className={["message-div", css(styles.slideInDown)].join(' ')}><p>{this.props.currentMessageText}</p><span onClick={() => {this.props.onHideMessage()}}>X</span></div>
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
    registerModalStatus: state.registerModalStatus.displayRegisterModal,
    messageStatus: state.messageStatus.showMessage,
    currentMessageText: state.currentMessageText.messageText
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onDisplayDetails: () => dispatch({type: 'DISPLAY_DETAILS_MODAL'}),
    onDisplaySignin: () => dispatch({type: 'DISPLAY_SIGNIN_MODAL'}),
    onHideRegister: () => dispatch({type: 'HIDE_REGISTER_MODAL'}),
    onHideSignin: () => dispatch({type: 'HIDE_SIGNIN_MODAL'}),
    onSignin: () => dispatch({type: 'SIGNIN'}),
    onSignout: () => dispatch({type: 'SIGNOUT'}),
    onHideMessage: () => dispatch({type: 'HIDE_MESSAGE'})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);