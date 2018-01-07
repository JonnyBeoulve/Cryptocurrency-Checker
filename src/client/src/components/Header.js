import React, { Component } from 'react';
import { connect } from 'react-redux';

import CryptocurrencyLogo from '../img/cryptocurrency_logo.png';

class Header extends Component {
  /*======================================================== 
  // This is the header for the app which includes a logo,
  // website name, and account related button that changes
  // depending on the state of the user.
  ========================================================*/
  render () {
    return (
      <div className="header">
          <img src={CryptocurrencyLogo} className="header-img" alt='' />
          <a href="/"><h2>Cryptocurrency Checker</h2></a>
      </div>
    );
  }
}

export default Header;