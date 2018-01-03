import React from 'react';

/*======================================================== 
// This will enter a row in the table with data for
// a particular cryptocurrency.
========================================================*/
const Crypto = props => {

  return (
    <tr className="cryptos-item">
        <td><span className="text-symbol-styling">{props.rank}</span></td>
        <td>{props.name} <span className="text-symbol-styling">({props.symbol})</span></td>
        <td><span className="text-symbol-styling">$</span> {props.marketCap}</td>
        <td><span className="text-symbol-styling">$</span> {props.priceUSD}</td>
        <td>{props.change24H}<span className="text-symbol-styling"> %</span></td>
    </tr>
  )
};

export default Crypto;