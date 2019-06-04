import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { toggleOverlayInfo } from "../../../store/actions";

function mapStateToProps(state) {
    return {
        overlayInfo: state.overlayInfo,
    };
}

const SvgWrapper = styled.svg`
    position: absolute;
    right: 15px;
    top: 15px;
`;

class ButtonClose extends React.Component {
    constructor(props) {
        super(props); 
    }

    toggleOverlay = () => {
        this.props.dispatch(toggleOverlayInfo(false))
    }

    render() {
        if (this.props.overlayInfo) { 
            return (
                <SvgWrapper onClick={this.toggleOverlay} width="20px" height="20px" viewBox="0 0 496 496" version="1.1">
                    <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Regular/times-circle" transform="translate(-8.000000, -8.000000)" fill="#FFFFFF" fillRule="nonzero">
                            <path d="M256,8 C393,8 504,119 504,256 C504,393 393,504 256,504 C119,504 8,393 8,256 C8,119 119,8 256,8 Z M256,456 C366.5,456 456,366.5 456,256 C456,145.5 366.5,56 256,56 C145.5,56 56,145.5 56,256 C56,366.5 145.5,456 256,456 Z" id="Combined-Shape"></path>
                            <path d="M357.8,193.8 L295.6,256 L357.8,318.2 C362.5,322.9 362.5,330.5 357.8,335.2 L335.2,357.8 C330.5,362.5 322.9,362.5 318.2,357.8 L256,295.6 L193.8,357.8 C189.1,362.5 181.5,362.5 176.8,357.8 L154.2,335.2 C149.5,330.5 149.5,322.9 154.2,318.2 L216.4,256 L154.2,193.8 C149.5,189.1 149.5,181.5 154.2,176.8 L176.8,154.2 C181.5,149.5 189.1,149.5 193.8,154.2 L256,216.4 L318.2,154.2 C322.9,149.5 330.5,149.5 335.2,154.2 L357.8,176.8 C362.5,181.5 362.5,189.1 357.8,193.8 L357.8,193.8 Z" id="Path"></path>
                        </g>
                    </g>
                </SvgWrapper>
            )
        } else {
            return (
                <div></div>
            )
        }


    }
}

export default connect(mapStateToProps)(ButtonClose)