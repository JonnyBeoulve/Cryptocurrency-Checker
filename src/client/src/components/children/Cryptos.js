import React from 'react';

import Crypto from './Crypto';

/*======================================================== 
//
========================================================*/
const Cryptos = props => {

    const allCryptos = props.cryptosArray;
    let cryptos;

    cryptos = allCryptos.map(results => <Crypto name={`${results.name}`} symbol={`${results.symbol}`} rank={`${results.rank}`} marketCap={`${results.market_cap_usd}`} priceUSD={`${results.price_usd}`} change24H={`${results.percent_change_24h}`} key={results.id} />);

        return (
            <div className="top-cryptos">
                <hr/>
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Market Cap</th>
                            <th>Current Price</th>
                            <th>Change 24H</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cryptos}
                    </tbody>
                </table>
            </div> 
    );
}

export default Cryptos;