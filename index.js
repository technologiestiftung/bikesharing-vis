import React from 'react';
import ReactDOM from 'react-dom';
import Root from './app/Root';

function startApp() {
    const rootElement = document.getElementById('app');
    function renderApp(RootComponent) {
        ReactDOM.render(
            <RootComponent />,
            rootElement
        );
    }

    // Mount the react-app
    renderApp(Root);
}

startApp();
