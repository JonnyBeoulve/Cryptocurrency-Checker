import React from 'react';

import CryptocurrencyLogo from '../img/cryptocurrency_logo.png';

/*======================================================== 
// This is the header for the app.
========================================================*/
const Header = props => {

  return (
    <div className="header">
        <img src={CryptocurrencyLogo} className="header-img" alt='' />
        <h1 onClick={props.listAll}>Cryptocurrency Checker</h1>
    </div>
  )
};

export default Header