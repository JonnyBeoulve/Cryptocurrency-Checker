import React from 'react';
import Button from 'react-bootstrap/lib/Button';

import CryptocurrencyLogo from '../img/cryptocurrency_logo.png';

/*======================================================== 
// This is the header for the app.
========================================================*/
const Header = props => {

  return (
    <div className="header">
        <img src={CryptocurrencyLogo} className="header-img" alt='' />
        <a href="/"><h2>Cryptocurrency Checker</h2></a>
        <Button bsStyle="primary" className="signin-register-btn" href="/signin">Sign in</Button>
    </div>
  )
};

export default Header;