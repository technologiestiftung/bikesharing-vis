import React from 'react';
import { connect } from "react-redux";
import { setStateDeckGl, setButtonPlay, setButtonPause, setAnimationSpeed, setButtonForward, setButtonBackward } from '../../../store/actions/index';
import classNames from 'classnames';

import styled from "styled-components";

const ButtonDiv = styled.div`
    border: 1px solid;
    font-family: ${props => props.theme.fontFamily};
    color: ${props => props.theme.colorLight};
    border-radius: 4px;
    cursor: pointer;

    padding-left: 11px;
    padding-right: 9px;
    height: 28px;
    padding-top: 9px;
    margin-right: 10px;

    transition: background ${props => props.theme.timeS} ease;

    polygon {
        fill: color: ${props => props.theme.colorLight};
    }

    &.btn-over {
        background: ${props => props.theme.colorLight};
        transition: background ${props => props.theme.timeS} ease;

        g#svgShape {
            polygon {
                fill: ${props => props.theme.colorPrimaryDark};
            }
        }
    }

    &.btn-pressed {
        background: ${props => props.theme.colorWhite};
        transition: background ${props => props.theme.timeS} ease;
    }

    @media screen and (max-width: ${props => props.theme.screenWidthM}) {
        margin-right: 0px;
    }
`;

const svgIcon = styled.div`
`;

function mapStateToProps(state) {
    return {
      time: state.time,
      animate: state.animate,
      buttonPlay: state.buttonPlay,
      buttonForward: state.buttonForward,
    };
}

class ButtonForward extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isHovered: false
        }
    }

    animateTrue = () => {
        let nodes = document.querySelectorAll('.btn');
        nodes[1].classList.remove('btn-pressed');
        this.props.dispatch(setStateDeckGl(true));
    }

    animateFalse = () => {
        let nodes = document.querySelectorAll('.btn');
        nodes[0].classList.remove('btn-pressed');
        this.props.dispatch(setStateDeckGl(false));
    }

    handleMouseEnter = () => {
        this.setState({
            isHovered: true
        })
    }

    handleMouseLeave = () => {
        this.setState({
            isHovered: false
        })
    }

    handleMouseDown = () => {
        this.props.dispatch(setButtonPause(false));
        this.props.dispatch(setButtonPlay(false));
        this.props.dispatch(setButtonForward(true));
        this.props.dispatch(setButtonBackward(false));
        this.props.dispatch(setAnimationSpeed(100));
    }

    render() {
        var btnClass = classNames({
            btn: true,
            'btn-pressed': this.props.buttonForward,
            'btn-over': !this.props.buttonForward && this.state.isHovered
        });

        return (
            <ButtonDiv 
                className={btnClass} 
                onClick={this.animateTrue} 
                onMouseEnter={this.handleMouseEnter} 
                onMouseLeave={this.handleMouseLeave}
                onMouseDown={this.handleMouseDown}
            >



                <svg width="16px" height="14px" viewBox="0 0 19 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g id="svgShape" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <polygon id="Rectangle-Copy-11" fill="#4E4C4C" fillRule="nonzero" transform="translate(10.000000, 7.000000) rotate(45.000000) translate(-10.000000, -7.000000) " points="4 3.5768468 16 1 13.4231532 13 8.7115766 8.2884234"></polygon>
                        <polygon id="Rectangle-Copy-11-Copy" fill="#4E4C4C" fillRule="nonzero" transform="translate(2.000000, 7.000000) rotate(45.000000) translate(-2.000000, -7.000000) " points="-4 3.5768468 8 1 5.4231532 13 0.7115766 8.2884234"></polygon>
                    </g>
                </svg>

            </ButtonDiv>
        )
    }

}

export default connect(mapStateToProps)(ButtonForward);