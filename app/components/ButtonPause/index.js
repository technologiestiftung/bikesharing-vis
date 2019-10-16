import React from 'react';
import { connect } from "react-redux";
import { setStateDeckGl, setButtonPlay, setButtonPause, setButtonBackward, setButtonForward } from '../../../store/actions/index';
import classNames from 'classnames';

import styled from "styled-components";

const ButtonDiv = styled.div`
    border: 3px solid rgba(255,255,255,.5);
    background: rgba(255,255,255,0);
    font-family: ${props => props.theme.fontFamily};
    color: ${props => props.theme.colorLight};
    border-radius: 100px;
    cursor: pointer;
    padding-left: 10px;
    padding-right: 10px;
    height: 24px;
    padding-top: 3px;
    margin-right: 8px;
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
      buttonPause: state.buttonPause,
      buttonPlay: state.buttonPlay,
    };
}

class ButtonPause extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isPressed: false,
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
        this.props.dispatch(setButtonForward(false));
        this.props.dispatch(setButtonBackward(false));
        this.props.dispatch(setButtonPlay(false));
        this.props.dispatch(setButtonPause(true));
    }

    render() {
        var btnClass = classNames({
            btn: true,
            'btn-pressed': this.props.buttonPause,
            'btn-over': !this.state.isPressed && this.state.isHovered
        });

        return (
            <ButtonDiv 
            className={btnClass} 
            onClick={this.animateFalse} 
            onMouseEnter={this.handleMouseEnter} 
            onMouseLeave={this.handleMouseLeave}
            onMouseDown={this.handleMouseDown}
            >
                <svg width="7px" height="10px" viewBox="0 0 11 15" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="svgShape" transform="translate(-748.000000, -988.000000)" fill="rgba(255,255,255,.5)">
                            <g id="Group-3" transform="translate(731.000000, 973.105951)">
                                <g id="Group-3-Copy" transform="translate(17.000000, 15.000000)">
                                    <g id="Group-2">
                                        <rect id="Rectangle" x="0" y="0" width="4" height="14"></rect>
                                        <rect id="Rectangle-Copy-10" x="7" y="0" width="4" height="14"></rect>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </ButtonDiv>
        )
    }

}

export default connect(mapStateToProps)(ButtonPause);