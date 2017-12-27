import React from 'react';

/*======================================================== 
//
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