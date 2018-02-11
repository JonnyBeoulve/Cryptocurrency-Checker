import React, { Component } from 'react';

import CryptocurrencyLogo from '../img/cryptocurrency_logo.png';

class Footer extends Component {
/*======================================================================
// This will render the Footer at the bottom of each page.
======================================================================*/
  render() {
    return (
      <div className="footer">
        <img src={CryptocurrencyLogo} className="footer-img" alt='' />
        <p>Cryptocurrency Checker made by <a href="http://www.jonathanleack.com" target="blank">Jonathan Leack</a>.</p>
      </div>
    );
  }
}

export default Footer;