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

class ButtonInfo extends React.Component {
    constructor(props) {
        super(props); 
    }

    toggleOverlay = () => {
        this.props.dispatch(toggleOverlayInfo(true))
    }

    render() {
        if (this.props.overlayInfo) {
            return (
                <div></div>
            )
        } else {
            return (
                <SvgWrapper onClick={this.toggleOverlay} width="25px" height="25px" viewBox="0 0 496 496" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Solid/info-circle" transform="translate(-8.000000, -8.000000)" fill="#FFFFFF" fillRule="nonzero">
                            <path d="M256,8 C392.957,8 504,119.083 504,256 C504,392.997 392.957,504 256,504 C119.043,504 8,392.997 8,256 C8,119.083 119.043,8 256,8 Z M256,118 C232.804,118 214,136.804 214,160 C214,183.196 232.804,202 256,202 C279.196,202 298,183.196 298,160 C298,136.804 279.196,118 256,118 Z M312,372 L312,348 C312,341.373 306.627,336 300,336 L288,336 L288,236 C288,229.373 282.627,224 276,224 L212,224 C205.373,224 200,229.373 200,236 L200,260 C200,266.627 205.373,272 212,272 L224,272 L224,336 L212,336 C205.373,336 200,341.373 200,348 L200,372 C200,378.627 205.373,384 212,384 L300,384 C306.627,384 312,378.627 312,372 Z" id="Combined-Shape"></path>
                        </g>
                    </g>
                </SvgWrapper>
            )
        }
    }
}

export default connect(mapStateToProps)(ButtonInfo)