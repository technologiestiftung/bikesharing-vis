import React from 'react';
import { connect } from "react-redux";
import { setStateDeckGl, setViewport, setTime, toggleProvider, setSbahnVisible, toggleUpdate, setStoryVisible, setStoryId, setButtonPlay, setButtonPause, setAnimationSpeed, setButtonForward, setButtonBackward } from '../../../store/actions/index';
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
      storyVisible: state.storyVisible,
      storyId: state.storyId
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

    moveToLinienStr = () => {
        const linienStr = {
            latitude: 52.52662696311112,
            longitude: 13.401849568575383,
            zoom: 15.022597285291257,
            pitch: 45,
            bearing: 0,
            transitionDuration: this.props.transitionDuration,
            transitionInterpolator: new FlyToInterpolator(),
            transitionEasing: d3EaseCubic
        }

        this.props.dispatch(setStateDeckGl(false));
        this.props.dispatch(setViewport(linienStr));
        this.props.dispatch(setStoryId(2));

        
        setTimeout(() => {
            this.props.dispatch(toggleProvider([0,1]));
            this.props.dispatch(toggleUpdate(true));  
            this.props.dispatch(setStateDeckGl(true));
            this.props.dispatch(setButtonPause(false));
            this.props.dispatch(setButtonPlay(true));
            this.props.dispatch(setButtonBackward(false));
            this.props.dispatch(setButtonForward(false));
            this.props.dispatch(setStoryVisible(true));
        },this.props.transitionDuration)
    }

    moveToBerlin = (val) => {

        const Berlin = {
            latitude: 52.50707714655106,
            longitude: 13.390768001568283,
            zoom: 12.586449081940776,
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
            this.props.dispatch(setButtonPause(false));
            this.props.dispatch(setButtonPlay(true));
            this.props.dispatch(setButtonBackward(false));
            this.props.dispatch(setButtonForward(false));
        },this.props.transitionDuration)

        this.props.dispatch(setSbahnVisible(false));
        this.props.dispatch(setAnimationSpeed(20));
    }
    
    moveToLongestRide = () => {
        const longestRide = {
            altitude: 1.5,
            bearing: 70,
            latitude: 52.554008431213965,
            longitude: 13.321589665841778,
            pitch: 45,
            zoom: 11.094041030143377,
            transitionDuration: this.props.transitionDuration,
            transitionInterpolator: new FlyToInterpolator(),
            transitionEasing: d3EaseCubic
        }

        this.props.dispatch(toggleProvider([0]));
        this.props.dispatch(setTime(28369));
        this.props.dispatch(setStateDeckGl(false));
        this.props.dispatch(toggleUpdate(true));   

        this.props.dispatch(setStoryId(0));    
        
        setTimeout(() => {
            this.props.dispatch(setStoryVisible(true));
        }, this.props.transitionDuration);

        this.props.dispatch(setViewport(longestRide));
        this.props.dispatch(setSbahnVisible(true));
    }

    moveToPenaltyZone = () => {
        const penaltyZone = {
            altitude: 1.5,
            bearing: -20,
            latitude: 52.47217633115334,
            longitude: 13.409666905999991,
            zoom: 15.2254480797017,
            pitch: 45,
            transitionDuration: this.props.transitionDuration,
            transitionInterpolator: new FlyToInterpolator(),
            transitionEasing: d3EaseCubic            
        }


        this.props.dispatch(setStateDeckGl(false));
        this.props.dispatch(setViewport(penaltyZone));
        this.props.dispatch(setStoryId(1));

        
        setTimeout(() => {
            this.props.dispatch(toggleProvider([0,1]));
            this.props.dispatch(toggleUpdate(true));  
            this.props.dispatch(setStateDeckGl(true));
            this.props.dispatch(setButtonPause(false));
            this.props.dispatch(setButtonPlay(true));
            this.props.dispatch(setButtonBackward(false));
            this.props.dispatch(setButtonForward(false));
            this.props.dispatch(setStoryVisible(true));
        },this.props.transitionDuration)

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
                <CameraWrapper onClick={this.moveToBerlin}>Reset</CameraWrapper>
                <div style={{width: 10 +'px'}}></div>
                <CameraWrapper onClick={this.moveToPenaltyZone}>Leihradfreie Zonen</CameraWrapper>
                <div style={{width: 10 +'px'}}></div>
                <CameraWrapper onClick={this.moveToLinienStr}>Fahrradstraßen</CameraWrapper>
            </WrapperOuter>
        );
    }
}

export default connect(mapStateToProps)(CameraHandle);