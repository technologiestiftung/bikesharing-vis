import React from 'react';
import { connect } from "react-redux";
import { setStateDeckGl, setViewport, setSbahnVisible, setStoryId, setButtonPlay, setButtonPause, setAnimationSpeed, setButtonForward, setButtonBackward } from '../../../store/actions/index';
import { FlyToInterpolator } from 'react-map-gl';
import { easeCubic as d3EaseCubic } from 'd3';
import styled from "styled-components";
import classNames from 'classnames';

function mapStateToProps(state) {
    return {
      animate: state.animate,
      viewport: state.viewport,
      transitionDuration: state.transitionDuration,
      vendor: state.vendor,
      time: state.time,
      storyId: state.storyId,
      districtView: state.districtView
    };
}

const WrapperOuter = styled.div`
    display: flex;
    flex-direction: row;
`

class CameraHandle extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps) {
        if (this.props.districtView != null && prevProps.districtView != null) {
            if (this.props.districtView[0].name != prevProps.districtView[0].name) {
                // console.log(this.props.districtView[0]);
                this.updatePos(this.props.districtView[0]);
            }
        }
    }

    updatePos = (view) => {
        const location = {
            longitude: view.longitude,
            latitude: view.latitude, 
            zoom: view.zoom,
            pitch: 45,
            transitionDuration: 2000,
            transitionInterpolator: new FlyToInterpolator(),
            transitionEasing: d3EaseCubic
        }

        this.props.dispatch(setStateDeckGl(false));
        this.props.dispatch(setViewport(location));
        
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


    moveToLocation = () => {

        console.log(this.props);

        const location = {
            longitude: this.props.lng,
            latitude: this.props.lat, 
            zoom: this.props.zoom,
            pitch: this.props.pitch,
            bearing: this.props.bearing,
            transitionDuration: this.props.transitionDuration,
            transitionInterpolator: new FlyToInterpolator(),
            transitionEasing: d3EaseCubic
        }

        this.props.dispatch(setStateDeckGl(false));
        this.props.dispatch(setViewport(location));
        this.props.dispatch(setStoryId(this.props.newStoryId));
        
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

    render() {
        if (this.props.newStoryId != null) {
            var btnClass = classNames({
                'camera-handle': true,
                'active': this.props.storyId == this.props.newStoryId
            });
        } else if (this.props.newStoryId == null) {
            var btnClass = classNames({
                'camera-handle': true,
                'active': true
            });
        }

        
        return (
            <span className={`${btnClass} ${this.props.classNaming}`} onClick={this.moveToLocation}>{this.props.label}</span>
        );
    }
}

export default connect(mapStateToProps)(CameraHandle);