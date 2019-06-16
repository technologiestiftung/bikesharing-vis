import React from 'react';
import { connect } from "react-redux";
import { setStateDeckGl, setViewport, setTime, toggleProvider, toggleUpdate, setStoryVisible } from '../../../store/actions/index';
import { FlyToInterpolator } from 'react-map-gl';
import { easeCubic as d3EaseCubic } from 'd3';
import styled from "styled-components";
import classNames from 'classnames';

import { 
    interpolateNumber as d3InterpolateNumber,
    select as d3Select,
    easeLinear as d3EaseLinear,
    transition as d3Transition
} from 'd3';

function mapStateToProps(state) {
    return {
      animate: state.animate,
      viewport: state.viewport,
      transitionDuration: state.transitionDuration,
      vendor: state.vendor,
      time: state.time,
      storyVisible: state.storyVisible
    };
}

const WrapperOuter = styled.div`
    display: flex;
    flex-direction: row;
`

const CameraWrapper = styled.span`
    border: 1px solid;
    font-family: ${props => props.theme.fontFamily};
    color: white;
    border-radius: 6px;
    cursor: pointer;
    height: 20px;
    padding: 2px 6px 3px 6px;
    transition: all .25s ease;

    &:hover {
        background: white;
        color: black;
    }
`;

class CameraHandle extends React.Component {
    constructor(props) {
        super(props);
    }

    moveToHH = (val) => {

        const HH = {
            longitude: 9.988456,
            latitude: 53.588871,
            zoom: 14,
            pitch: 45,
            bearing: 0,
            transitionDuration: this.props.transitionDuration,
            transitionInterpolator: new FlyToInterpolator(),
            transitionEasing: d3EaseCubic
        }

        this.props.dispatch(setStateDeckGl(false));
        this.props.dispatch(setViewport(HH));
        setTimeout(() => {
            this.props.dispatch(setStateDeckGl(true));
        },this.props.transitionDuration)
	}

    moveToNYC = (val) => {

        const NYC = {
            longitude: -74.1,
            latitude: 40.7,
            zoom: 14,
            pitch: 45,
            bearing: 0,
            transitionDuration: this.props.transitionDuration,
            transitionInterpolator: new FlyToInterpolator(),
            transitionEasing: d3EaseCubic
        }

        this.props.dispatch(setStateDeckGl(false));
        this.props.dispatch(setViewport(NYC));
        setTimeout(() => {
            this.props.dispatch(setStateDeckGl(true));
        },this.props.transitionDuration)
    }

    moveToTiergarten = (val) => {

        const TIERGARTEN = {
            longitude: 13.353685,
            latitude: 52.514098, 
            zoom: 14,
            pitch: 45,
            bearing: 0,
            transitionDuration: this.props.transitionDuration,
            transitionInterpolator: new FlyToInterpolator(),
            transitionEasing: d3EaseCubic
        }

        this.props.dispatch(setStateDeckGl(false));
        this.props.dispatch(setViewport(TIERGARTEN));
        setTimeout(() => {
            this.props.dispatch(setStateDeckGl(true));
        },this.props.transitionDuration)
    }

    moveToBerlin = (val) => {

        const Berlin = {
            latitude: 52.518566,
            longitude: 13.385754,
            zoom: 12,
            pitch: 45,
            bearing: 0,
            transitionDuration: this.props.transitionDuration,
            transitionInterpolator: new FlyToInterpolator(),
            transitionEasing: d3EaseCubic
        }

        this.props.dispatch(setStoryVisible(false));     
        this.props.dispatch(setStateDeckGl(false));
        this.props.dispatch(setViewport(Berlin));
        
        setTimeout(() => {
            this.props.dispatch(setStateDeckGl(true));
        },this.props.transitionDuration)

        console.log(this.props);
    }
    
    moveToLongestRide = (val) => {
        const longestRide = {
            altitude: 1.5,
            bearing: 70,
            latitude: 52.576533183785116,
            longitude: 13.296013890458365,
            pitch: 45,
            zoom: 10.66808313795351,
            transitionDuration: this.props.transitionDuration,
            transitionInterpolator: new FlyToInterpolator(),
            transitionEasing: d3EaseCubic
        }

        this.props.dispatch(toggleProvider([0]));
        this.props.dispatch(setTime(28369));
        this.props.dispatch(setStateDeckGl(false));
        this.props.dispatch(toggleUpdate(true));       
        
        setTimeout(() => {
            this.props.dispatch(setStoryVisible(true));
        }, this.props.transitionDuration);



        this.props.dispatch(setViewport(longestRide));
    }

    interpolateStates = (timeStart ,timestamp, mark) => {
        let interpolator = d3InterpolateNumber(timeStart, timestamp);
        let timeCurrent = interpolator(mark);

        this.props.dispatch(setTime(timeCurrent));
    }
    
    editStateDeckGl() {
        const playing = true // true ? false : true;
        this.props.dispatch(setStateDeckGl(playing));
    }

    render() {
        var btnClass = classNames({
            btn: true,
            // 'btn-pressed': this.containsProvider(),
            // 'btn-over': !this.props.buttonPlay && this.state.isHovered,
        });
        
        return (
            <WrapperOuter>
                <CameraWrapper onClick={this.moveToBerlin}>Ansicht zurücksetzen</CameraWrapper>
                <div style={{width: 10 +'px'}}></div>
                <CameraWrapper onClick={this.moveToLongestRide}>Längste Strecke</CameraWrapper>
            </WrapperOuter>
        );
    }
}

export default connect(mapStateToProps)(CameraHandle);