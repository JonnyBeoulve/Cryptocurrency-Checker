import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';

import CryptocurrencyLogo from '../img/cryptocurrency_logo.png';

class Header extends Component {

  /*======================================================== 
  // Only for testing purposes.
  ========================================================*/
  componentWillMount() {
    console.log(this.props.signedInStatus);
  }

  /*======================================================== 
  // This is the header for the app.
  ========================================================*/
  render () {
    return (
      <div className="header">
          <img src={CryptocurrencyLogo} className="header-img" alt='' />
          <a href="/"><h2>Cryptocurrency Checker</h2></a>
          {(!this.props.signedInStatus)
            ? <Button bsStyle="primary" className="signin-register-btn" href="/signin">Sign in</Button>
            : <Button bsStyle="primary" className="signin-register-btn" href="/account">Account</Button> }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    signedInStatus: state.signedInStatus.signedIn
  };
};

export default connect(mapStateToProps)(Header);