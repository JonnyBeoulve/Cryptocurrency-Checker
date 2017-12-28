import React from 'react';

/*======================================================== 
// This will enter a row in the table with data for
// a particular cryptocurrency.
========================================================*/
const Crypto = props => {

  return (
    <tr className="top-cryptos-item">
        <td>{props.rank}</td>
        <td>{props.name} ({props.symbol})</td>
        <td>{props.marketCap}</td>
        <td>${props.priceUSD}</td>
        <td>{props.change24H}%</td>
    </tr>
  )
};

export default Crypto;