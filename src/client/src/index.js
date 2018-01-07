import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import reducer from './store/reducer';
import registerServiceWorker from './registerServiceWorker';
import './css/index.css';

const rootReducer = combineReducers({
    signedInStatus: reducer,
    signinModalStatus: reducer,
    registerModalStatus: reducer
});

const store = createStore(rootReducer);

/*=======================================================================
// This will insert the top level React component into
// the body of the HTML page with ID "root".
=======================================================================*/
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();