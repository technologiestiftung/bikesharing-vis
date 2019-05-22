import React from 'react';
import DeckGlWrapper from './DeckGL/index';
import Controls from './Controls/index';
import { connect } from "react-redux";

import store from '../../store/index';

import { setTime } from '../../store/actions/index';

const bindActionsToDispatch = dispatch => (
    {
        setTime : () => dispatch(setTime)
    }
);

function AppContainer(props) {

    return (
        <div className="app-wrapper">
            <DeckGlWrapper/>
            <Controls time={props.time}/>
        </div>
    );
}

const mapStateToProps = function(state) {
    return {
      time: state.time,
    }
  }

export default connect(mapStateToProps)(AppContainer);