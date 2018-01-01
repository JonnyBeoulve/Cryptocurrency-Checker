import React from 'react';

import Crypto from './Crypto';

/*======================================================== 
// Create a table to display a list of cryptos.
========================================================*/
const Cryptos = props => {

    const allCryptos = props.cryptosArray;
    let cryptos;

    cryptos = allCryptos.map(results => <Crypto name={`${results.name}`} symbol={`${results.symbol}`} rank={`${results.rank}`} marketCap={`${results.market_cap_usd}`} priceUSD={`${results.price_usd}`} change24H={`${results.percent_change_24h}`} key={results.id} />);

        return (
            <div className="cryptos">
                <div className="cryptos-header">
                    <p>Rank</p>
                    <p>Name</p>
                    <p>Market Cap</p>
                    <p>Current Price</p>
                    <p>Change 24H</p>
                </div>
                <table className="cryptos-table">
                    <tbody>
                        {cryptos}
                    </tbody>
                </table>
            </div> 
    );
}

export default Cryptos;