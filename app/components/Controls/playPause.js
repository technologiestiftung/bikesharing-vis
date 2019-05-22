import React from 'react';
import { connect } from "react-redux";
import { setStateDeckGl } from '../../../store/actions/index';

function mapStateToProps(state) {
    return {
      animate: state.animate
    };
  }

function playPause(props) {
    
    function editStateDeckGl() {
        const playing = props.animate == true ? false : true;
        props.dispatch(setStateDeckGl(playing));
    }

    return (
        <div className="playPause-wrapper">
            <button onClick={editStateDeckGl}>Play</button>
        </div>
    );
}

export default connect(mapStateToProps)(playPause);