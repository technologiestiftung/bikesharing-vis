import React from 'react';
import { connect } from "react-redux";

import PlayPause from './playPause';


function mapStateToProps(state) {
  return {
    time: state.time,
    animate: true
  };
}

function Controls(props) {

    return (
        <div className="controls-wrapper">
            <span>Controls</span>
            <span>{props.time}</span>
            <PlayPause/>
        </div>
    );
}

export default connect(mapStateToProps)(Controls);