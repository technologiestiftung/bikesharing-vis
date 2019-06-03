import React from 'react';
import { connect } from "react-redux";
import { setStateDeckGl, setButtonPlay, setButtonPause } from '../../../store/actions/index';
import classNames from 'classnames';

import styled from "styled-components";

const ButtonDiv = styled.div`
    border: 1px solid;
    font-family: ${props => props.theme.fontFamily};
    color: ${props => props.theme.colorLight};
    border-radius: 4px;
    cursor: pointer;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 15px;
    margin-right: 10px;
    transition: background ${props => props.theme.timeS} ease;

    polygon {
        fill: color: ${props => props.theme.colorLight};
    }

    &.btn-over {
        background: ${props => props.theme.colorLight};
        transition: background ${props => props.theme.timeS} ease;

        g#svgShape {
            fill: ${props => props.theme.colorPrimaryDark};
        }
    }

    &.btn-pressed {
        background: ${props => props.theme.colorWhite};
        transition: background ${props => props.theme.timeS} ease;
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
        this.props.dispatch(setButtonPlay(true));
        this.props.dispatch(setButtonPause(false));
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
                <svg width="11px" height="14px" viewBox="0 0 11 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="svgShape" transform="translate(-694.000000, -988.000000)" fill="#4E4C4C">
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