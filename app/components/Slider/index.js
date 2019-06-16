import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { setTime, setStateDeckGl, setButtonPause, setButtonPlay, setTimeOffset } from '../../../store/actions/index';

const SliderWrapper = styled.div`
    z-index: 1000;
    position: absolute;
    width: 339px;
`;

const SliderInput = styled.input`
    -webkit-appearance: none;  /* Override default CSS styles */
    appearance: none;
    margin: 0;
    width: 100%; /* Full-width */
    height: 36px; /* Specified height */
    background: none; /* Grey background */
    outline: none; /* Remove outline */
    opacity: 0.25; /* Set transparency (for mouse-over effects on hover) */
    -webkit-transition: .2s; /* 0.2 seconds transition on hover */
    transition: opacity .2s;
    cursor: pointer;

    &:hover {
        opacity: 1;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none; /* Override default look */
        appearance: none;
        width: 0px;
        height: 0px;
        transform: translateY(25px);
        cursor: pointer; /* Cursor on hover */
        border-left: 3px solid transparent;
        border-right: 3px solid transparent;
        border-bottom: 5px solid rgb(33, 168, 174);
    }

`;

function mapStateToProps(state) {
    return {
      animate: state.animate,
      time: state.time,
      timeOffset: state.timeOffset
    };
}

class Slider extends React.Component {

    onChange = () => {
        const val = parseFloat(event.target.value);
        console.log(val)
        this.props.dispatch(setTime(val));
        this.props.dispatch(setStateDeckGl(false));
        this.props.dispatch(setButtonPause(true));
        this.props.dispatch(setButtonPlay(false));
        this.props.dispatch(setTimeOffset(0));
    }

    render() {
        return (
            <SliderWrapper>
                <SliderInput type="range" min="1" max="99999" value={this.props.time} onChange={this.onChange} className="slider" id="myRange"></SliderInput>
            </SliderWrapper>
        )
    }
};

export default connect(mapStateToProps)(Slider);

