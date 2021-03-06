import React from 'react';

import { flipInX } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

var NumberFormat = require('react-number-format');

/*======================================================== 
// Animated styles using Aphrodite and React Animations.
========================================================*/
const styles = StyleSheet.create({
  flipInX: {
    animationName: flipInX,
    animationDuration: '1.5s'
  }
})

/*======================================================== 
// This will enter a row in the table with data for
// a particular cryptocurrency.
========================================================*/
const Crypto = props => {

  return (
    <tr className="cryptos-item">
      <td className={css(styles.flipInX)}><span className="text-symbol-styling">{props.rank}</span></td>
      <td className={css(styles.flipInX)}>{props.name} <span className="text-symbol-styling">({props.symbol})</span></td>
      <td className={css(styles.flipInX)}><NumberFormat value={props.marketCap} displayType={'text'} thousandSeparator={true} renderText={value => <div><span className="text-symbol-styling">$</span> {value}</div>} /></td>
      <td className={css(styles.flipInX)}><span className="text-symbol-styling">$</span> {props.priceUSD}</td>
      <td className={css(styles.flipInX)}>{props.change24H}<span className="text-symbol-styling"> %</span></td>
    </tr>
  )
};

export default Crypto;