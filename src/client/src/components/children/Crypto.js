import React from 'react';

var NumberFormat = require('react-number-format');

/*======================================================== 
// This will enter a row in the table with data for
// a particular cryptocurrency.
========================================================*/
const Crypto = props => {

  return (
    <tr className="cryptos-item">
      <td className="cryptos-item-td"><span className="text-symbol-styling">{props.rank}</span></td>
      <td className="cryptos-item-td">{props.name} <span className="text-symbol-styling">({props.symbol})</span></td>
      <td className="cryptos-item-td"><NumberFormat value={props.marketCap} displayType={'text'} thousandSeparator={true} renderText={value => <div><span className="text-symbol-styling">$</span> {value}</div>} /></td>
      <td className="cryptos-item-td"><span className="text-symbol-styling">$</span> {props.priceUSD}</td>
      <td className="cryptos-item-td">{props.change24H}<span className="text-symbol-styling"> %</span></td>
    </tr>
  )
};

export default Crypto;