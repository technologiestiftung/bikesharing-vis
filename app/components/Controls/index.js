import React from 'react';
import { connect } from "react-redux";
import { setTime, setStateDeckGl } from '../../../store/actions/index';

import PlayPause from './playPause';
import Clock from './Clock';

function mapStateToProps(state) {
  return {
    time: state.time,
    animate: true
  };
}

function Controls(props) {
    function editTime(val) {
        props.dispatch(setTime(val));
    };
    
    const editStateDeckGl = (val) => {
        props.dispatch(setStateDeckGl(val));
    }

    return (
        <div className="controls-wrapper">
            <span>Controls</span>
            <span>{props.time}</span>
            <PlayPause/>
            <Clock/>
        </div>
    );
}

export default connect(mapStateToProps)(Controls);