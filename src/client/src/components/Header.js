import React, { Component } from 'react';

import CryptocurrencyLogo from '../img/cryptocurrency_logo.png';

class Header extends Component {
  /*======================================================== 
  // This is the header for the app which includes a logo
  // and the website name.
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