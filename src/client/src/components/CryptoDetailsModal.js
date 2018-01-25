import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';

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
  // If the user clicks the follow button they will have that cryto
  // added to their user document in the database. This will allow
  // them to only view that crypto and any others they've followed
  // at the click of a button.
  ======================================================================*/
  submitFollow = (e) => {
    e.preventDefault();

    axios ({
      method: 'post',
      url: window.location.href + 'account/follow',
      data: {
        followCrypto: this.selCrypto
      }
    })
    .then(response => {
      this.setState({
        notice: true,
        noticeMessage: `Successfully followed + ${this.selCrypto}`
      })
    })
    .catch(error => {
      this.setState({
        notice: true,
        noticeMessage: 'Following failed. Note that you must be signed in.'
      })
      console.log('Error occurred while signing in.', error);
    })
  }

  /*======================================================================
  // If the user clicks the X on the top right of the details modal,
  // it will close.
  ======================================================================*/
  handleHideDetails = (e) => {
    this.props.onHideDetails();
  }

  render() {

    const selCrypto = this.props.selectedCrypto;

    return (
    <div className="crypto-detail">
      <p className="modal-close" onClick={this.handleHideDetails}>X</p>
      <h2>{selCrypto.name} ({selCrypto.symbol})</h2>
      <Button bsStyle="primary" className="follow-btn" onClick={this.submitFollow}>Follow</Button>
      <p>Rank: <span className="text-symbol-styling">#</span>{selCrypto.rank}</p>
      <p>Price: {selCrypto.price_usd} <span className="text-symbol-styling">USD</span></p>
      <p>Market Cap: {selCrypto.market_cap_usd} <span className="text-symbol-styling">USD</span></p>
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
    detailsModalStatus: state.detailsModalStatus.displayDetailsModal
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onDisplayDetails: () => dispatch({type: 'DISPLAY_DETAILS_MODAL'}),
    onHideDetails: () => dispatch({type: 'HIDE_DETAILS_MODAL'}),
    onHideRegister: () => dispatch({type: 'HIDE_REGISTER_MODAL'}),
    onHideSignin: () => dispatch({type: 'HIDE_SIGNIN_MODAL'}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CryptoDetailsModal);