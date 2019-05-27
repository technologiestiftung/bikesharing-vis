import React from 'react';
import { connect } from "react-redux";
import { setStateDeckGl, setViewport } from '../../../store/actions/index';
import {FlyToInterpolator} from 'react-map-gl';
import { easeCubic as d3EaseCubic } from 'd3';

function mapStateToProps(state) {
    return {
      animate: state.animate,
      viewport: state.viewport,
      transitionDuration: state.transitionDuration
    };
  }

function playPause(props) {

    function moveToHH(val) {

        const HH = {
            longitude: 9.988456,
            latitude: 53.588871,
            zoom: 14,
            transitionDuration: props.transitionDuration,
            transitionInterpolator: new FlyToInterpolator(),
            transitionEasing: d3EaseCubic
        }

        props.dispatch(setStateDeckGl(false));
        props.dispatch(setViewport(HH));
        setTimeout(() => {
            props.dispatch(setStateDeckGl(true));
        },props.transitionDuration)
	}

    function moveToNYC(val) {

        const NYC = {
            longitude: -74.1,
            latitude: 40.7,
            zoom: 14,
            transitionDuration: props.transitionDuration,
            transitionInterpolator: new FlyToInterpolator(),
            transitionEasing: d3EaseCubic
        }

        props.dispatch(setStateDeckGl(false));
        props.dispatch(setViewport(NYC));
        setTimeout(() => {
            props.dispatch(setStateDeckGl(true));
        },props.transitionDuration)
	}
    
    function editStateDeckGl() {
        const playing = props.animate == true ? false : true;
        console.log(playing);
        props.dispatch(setStateDeckGl(playing));
    }

    return (
        <div className="playPause-wrapper">
            <button onClick={editStateDeckGl}>Play</button>
            <button onClick={moveToNYC}>New York</button>
            <button onClick={moveToHH}>Hamburg</button>
        </div>
    );
}

export default connect(mapStateToProps)(playPause);