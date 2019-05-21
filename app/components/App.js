import React from 'react';
import DeckGlWrapper from './DeckGL/index';

class AppContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('App wrapper component loaded');
    }

    render() {
        return (
            <div className="app-wrapper">
                <DeckGlWrapper/>
            </div>
        );
    }
}

export default AppContainer;