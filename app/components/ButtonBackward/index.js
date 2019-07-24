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
    height: 27px;
    padding-left: 8px;
    padding-right: 12px;
    padding-top: 10px;
    margin-right: 10px;
    margin-left: 20px;
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
        margin-left: 0px;
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
      buttonBackward: state.buttonBackward,
    };
}

class ButtonBackward extends React.Component {
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
        this.props.dispatch(setButtonBackward(true));
        this.props.dispatch(setButtonPause(false));
        this.props.dispatch(setButtonPlay(false));
        this.props.dispatch(setButtonForward(false));
        this.props.dispatch(setAnimationSpeed(-100));
    }

    render() {
        var btnClass = classNames({
            btn: true,
            'btn-pressed': this.props.buttonBackward,
            'btn-over': !this.props.buttonBackward && this.state.isHovered
        });

        return (
            <ButtonDiv 
                className={btnClass} 
                onClick={this.animateTrue} 
                onMouseEnter={this.handleMouseEnter} 
                onMouseLeave={this.handleMouseLeave}
                onMouseDown={this.handleMouseDown}
            >



                <svg width="16px" height="15px" viewBox="0 0 19 15" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g id="svgShape" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <polygon id="Rectangle-Copy-11-Copy-2" fill="#4E4C4C" fillRule="nonzero" transform="translate(9.000000, 7.485281) rotate(-135.000000) translate(-9.000000, -7.485281) " points="3 4.06212817 15 1.48528137 12.4231532 13.4852814 7.7115766 8.77370477"></polygon>
                        <polygon id="Rectangle-Copy-11-Copy-3" fill="#4E4C4C" fillRule="nonzero" transform="translate(17.000000, 7.485281) rotate(-135.000000) translate(-17.000000, -7.485281) " points="11 4.06212817 23 1.48528137 20.4231532 13.4852814 15.7115766 8.77370477"></polygon>
                    </g>
                </svg>

            </ButtonDiv>
        )
    }

}

export default connect(mapStateToProps)(ButtonBackward);