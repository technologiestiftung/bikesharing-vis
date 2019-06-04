import React from 'react';
import { connect } from "react-redux";
import { setStateDeckGl, setViewport, setVendor } from '../../../store/actions/index';
import { FlyToInterpolator } from 'react-map-gl';
import { easeCubic as d3EaseCubic } from 'd3';
import styled from "styled-components";
import classNames from 'classnames';

function mapStateToProps(state) {
    return {
      animate: state.animate,
      viewport: state.viewport,
      transitionDuration: state.transitionDuration,
      vendor: state.vendor
    };
}

const CameraWrapper = styled.span`
    border: 1px solid;
    font-family: ${props => props.theme.fontFamily};
    color: ${props => props.theme.colorLight};
    border-radius: 6px;
    cursor: pointer;
    height: 20px;
    padding: 2px 6px 3px 6px;
    margin-right: 10px;
    transition: all .25s ease;
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
            latitude: 52.500869,
            longitude: 13.419047,
            zoom: 16,
            pitch: 45,
            bearing: 0,
            transitionDuration: this.props.transitionDuration,
            transitionInterpolator: new FlyToInterpolator(),
            transitionEasing: d3EaseCubic
        }

        this.props.dispatch(setStateDeckGl(false));
        this.props.dispatch(setViewport(Berlin));
        setTimeout(() => {
            this.props.dispatch(setStateDeckGl(true));
        },this.props.transitionDuration)
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
            <div className="playPause-wrapper">
                <CameraWrapper onClick={this.moveToNYC}>New York</CameraWrapper>
                <CameraWrapper onClick={this.moveToHH}>Hamburg</CameraWrapper>
                <CameraWrapper onClick={this.moveToBerlin}>Berlin</CameraWrapper>
                <CameraWrapper onClick={this.moveToTiergarten}>Tiergarten</CameraWrapper>
            </div>
        );
    }
}

export default connect(mapStateToProps)(CameraHandle);