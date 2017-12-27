import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './css/index.css';

/*=======================================================================
// This will insert the top level React component into
// the body of the HTML page with ID "root".
=======================================================================*/
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();