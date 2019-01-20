import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import registerServiceWorker from './registerServiceWorker';

import reducer from './js/reducers';

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>, 
    document.getElementById('root')
);

registerServiceWorker();
