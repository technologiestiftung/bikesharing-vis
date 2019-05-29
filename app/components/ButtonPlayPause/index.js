import React from 'react';
import { connect } from "react-redux";
import { setStateDeckGl } from '../../../store/actions/index';
import classNames from 'classnames';

import styled from "styled-components";

const ButtonDiv = styled.div`
    border: 1px solid;
    font-family: ${props => props.theme.fontFamily};
    color: ${props => props.theme.colorLight};
    border-radius: 4px;
    cursor: pointer;
    padding-left: 25px;
    padding-right: 25px;
    padding-top: 20px;
    margin-right: 10px;
    transition: background ${props => props.theme.timeM} ease;

    &:hover {
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
    };
}

class ButtonPlayPause extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isPressed: false,
            isHovered: false
        }
    }

    animateTrue = () => {
        this.props.dispatch(setStateDeckGl(true));
    }

    animateFalse = () => {
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
        const pressed = this.state.isPressed ? false : true;

        this.setState({
            isPressed: pressed
        })
    }

    render() {
        var btnClass = classNames({
            btn: true,
            'btn-pressed': this.state.isPressed,
            'btn-over': !this.state.isPressed && this.state.isHovered
        });

        if (this.props.type == 'play') {
    
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
                            <g id="Artboard-Copy-5" transform="translate(-694.000000, -988.000000)" fill="#2B2929">
                                <g id="Group-13" transform="translate(676.000000, 973.105951)">
                                    <polygon id="Rectangle-Copy-11" transform="translate(20.000000, 22.000000) rotate(-315.000000) translate(-20.000000, -22.000000) " points="14 18.5768468 26 16 23.4231532 28 18.7115766 23.2884234"></polygon>
                                </g>
                            </g>
                        </g>
                    </svg>
                </ButtonDiv>
            )
    
        } else if (this.props.type == 'pause') {
    
            return (
                <ButtonDiv 
                className={btnClass} 
                onClick={this.animateFalse} 
                onMouseEnter={this.handleMouseEnter} 
                onMouseLeave={this.handleMouseLeave}
                onMouseDown={this.handleMouseDown}
            >
                    <svg width="11px" height="15px" viewBox="0 0 11 15" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Artboard-Copy-5" transform="translate(-748.000000, -988.000000)" fill="#FFFFFF">
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

}

export default connect(mapStateToProps)(ButtonPlayPause);