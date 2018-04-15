import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';

import { zoomIn } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

var NumberFormat = require('react-number-format');

/*======================================================== 
// Animated styles using Aphrodite and React Animations.
========================================================*/
const styles = StyleSheet.create({
  zoomIn: {
    animationName: zoomIn,
    animationDuration: '1s'
  }
})

/*======================================================================
// This modal display details for a crypto that the user searched
// for. It also includes the search form and functionality found on
// the top right of the website.
======================================================================*/
class CryptoDetailsModal extends Component {

  /*======================================================================
  // This will track the state of the notice message that informs users
  // about whether they need to sign in to follow cryptos, or if a follow
  // request fails.
  ======================================================================*/
  constructor() {
    super();
    this.state = {
      notice: false,
      noticeMessage: ''
    }
  }

  /*======================================================================
  // This will track the state of the notice message that informs users
  // about whether they need to sign in to follow cryptos, or if a follow
  // request fails.
  ======================================================================*/
  componentDidMount() {
    if (!this.props.selectedCrypto) {
      this.props.onHideDetails();
      this.props.onSearchFailed();
    }
  }

  /*======================================================================
  // If the user clicks the follow button they will have that cryto
  // added to their user document in the database. This will allow
  // them to only view that crypto and any others they've followed
  // at the click of a button.
  ======================================================================*/
  submitFollow = (e) => {
    e.preventDefault();
    axios ({
      method: 'put',
      url: window.location.href + 'account/follow',
      data: {
        followedCrypto: this.props.selectedCrypto.name
      }
    })
    .then(response => {
      this.props.onFollowSuccess();
    })
    .catch(error => {
      this.props.onFollowFailed();
      console.log('Error occurred during follow.', error);
    })
  }

  /*======================================================================
  // If the user clicks the X on the top right of the details modal,
  // it will close.
  ======================================================================*/
  handleHideDetails = (e) => {
    this.props.onHideDetails();
    this.setState({
      notice: false,
    })
  }

  /*======================================================================
  // Render the details modal. If the search failed, the data fields
  // wil be empty, the Follow button won't be shown, and a notice
  // will be displayed to the user.
  ======================================================================*/
  render() {

    const selCrypto = this.props.selectedCrypto;

    return (
      <div className={["crypto-detail", css(styles.zoomIn)].join(' ')}>
        <p className="modal-close" onClick={this.handleHideDetails}>X</p>
        <h2>{selCrypto.name} ({selCrypto.symbol})</h2>
        {(this.props.signedInStatus)
          ? <Button bsStyle="primary" className="follow-btn" onClick={this.submitFollow}>Follow</Button>
          : <p></p> }
        <p>Rank: <span className="text-symbol-styling">#</span>{selCrypto.rank}</p>
        <p>Price: $ {selCrypto.price_usd}</p>
        <p><NumberFormat value={selCrypto.market_cap_usd} displayType={'text'} thousandSeparator={true} renderText={value => <div>Market Cap: $ {value} </div>} /></p>
        <p>Change 1 Hour: {selCrypto.percent_change_1h} <span className="text-symbol-styling">%</span></p>
        <p>Change 24 Hours: {selCrypto.percent_change_24h} <span className="text-symbol-styling">%</span></p>
        <p>Change 7 Days: {selCrypto.percent_change_7d} <span className="text-symbol-styling">%</span></p>
        {(this.state.notice)
                ? <p>{this.state.noticeMessage}</p>
                : <p></p> }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    detailsModalStatus: state.detailsModalStatus.displayDetailsModal,
    signedInStatus: state.signedInStatus.signedIn
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onDisplayDetails: () => dispatch({type: 'DISPLAY_DETAILS_MODAL'}),
    onHideDetails: () => dispatch({type: 'HIDE_DETAILS_MODAL'}),
    onHideRegister: () => dispatch({type: 'HIDE_REGISTER_MODAL'}),
    onHideSignin: () => dispatch({type: 'HIDE_SIGNIN_MODAL'}),
    onSearchFailed: () => dispatch({type: 'SEARCH_FAILED'}),
    onFollowSuccess: () => dispatch({type: 'FOLLOW_SUCCESS'}),
    onFollowFailed: () => dispatch({type: 'FOLLOW_FAILED'})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CryptoDetailsModal);