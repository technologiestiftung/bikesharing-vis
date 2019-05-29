import React from 'react';
import ReactDOM from 'react-dom';
import Root from './app/Root';

import { Provider } from "react-redux";
import store from './store/index.js';

import { setTime } from './store/actions/index.js';

window.store = store;
window.setTime = setTime;

function startApp() {
    const rootElement = document.getElementById('app');

    function renderApp(RootComponent) {
        ReactDOM.render(
            <Provider store={store}>
                <RootComponent/>    
            </Provider>
            ,rootElement);
    }

    // Mount the react-app
    renderApp(Root);
}

startApp();
