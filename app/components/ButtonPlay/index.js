import React from 'react';
import { connect } from "react-redux";
import { setStateDeckGl, setButtonPlay, setButtonPause, setAnimationSpeed, setButtonBackward, setButtonForward } from '../../../store/actions/index';
import classNames from 'classnames';

import styled from "styled-components";

const ButtonDiv = styled.div`
    border: 3px solid rgba(255,255,255,.5);
    font-family: ${props => props.theme.fontFamily};
    color: rgba(255,255,255,.5);
    border-radius: 100px;
    cursor: pointer;
    padding-left: 10px;
    padding-right: 10px;
    height: 24px;
    padding-top: 3px;
    margin-right: 5px;
    transition: background ${props => props.theme.timeS} ease;

    &.btn-over {
        background: rgba(255,255,255,.2);
        border: 3px solid rgba(255,255,255,.5);
        transition: all ${props => props.theme.timeS} ease;

        g#svgShape {
            fill: rgba(255,255,255,.5);
            transition: all ${props => props.theme.timeS} ease;
        }
    }

    &.btn-pressed {
        background: rgba(255,255,255,.2);
        border: 3px solid rgba(255,255,255,1);
        transition: background ${props => props.theme.timeS} ease;

        g#svgShape {
            fill: rgba(255,255,255,1);
            transition: all ${props => props.theme.timeS} ease;
        }
    }
`;

const svgIcon = styled.div`
`;

function mapStateToProps(state) {
    return {
      time: state.time,
      animate: state.animate,
      buttonPlay: state.buttonPlay,
    };
}

class ButtonPlay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isHovered: false
        }
    }

    animateTrue = () => {
        let nodes = document.querySelectorAll('.btn');
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
        this.props.dispatch(setButtonForward(false));
        this.props.dispatch(setButtonBackward(false));
        this.props.dispatch(setAnimationSpeed(20));
        this.props.dispatch(setButtonPlay(true));
    }

    render() {
        var btnClass = classNames({
            btn: true,
            'btn-pressed': this.props.buttonPlay,
            'btn-over': !this.props.buttonPlay && this.state.isHovered
        });

        return (
            <ButtonDiv 
                className={btnClass} 
                onClick={this.animateTrue} 
                onMouseEnter={this.handleMouseEnter} 
                onMouseLeave={this.handleMouseLeave}
                onMouseDown={this.handleMouseDown}
            >
                <svg width="7px" height="10px" viewBox="0 0 11 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="svgShape" transform="translate(-694.000000, -988.000000)" fill="rgba(255,255,255,.5)">
                            <g id="Group-13" transform="translate(676.000000, 973.105951)">
                                <polygon id="Rectangle-Copy-11" transform="translate(20.000000, 22.000000) rotate(-315.000000) translate(-20.000000, -22.000000) " points="14 18.5768468 26 16 23.4231532 28 18.7115766 23.2884234"></polygon>
                            </g>
                        </g>
                    </g>
                </svg>
            </ButtonDiv>
        )
    }

}

export default connect(mapStateToProps)(ButtonPlay);
