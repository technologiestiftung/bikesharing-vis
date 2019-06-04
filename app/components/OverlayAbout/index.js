import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import classNames from 'classnames';

function mapStateToProps(state) {
    return {
        overlayInfo: state.overlayInfo,
    };
}

import ButtonClose from '../ButtonClose/index.js';

const OverlayBackground = styled.div`
    width: 100%;
    height: 100%;
    background: ${props => props.theme.colorPrimaryDark};
    opacity: .75;
    position: absolute;
    top: 0;
    left: 0;
`;

const OverlayInfoWrapper = styled.div`
    background: ${props => props.theme.colorPrimaryDark};
    width: 800px;
    opacity: 1;
    height: 600px;

    position:absolute; /*it can be fixed too*/
    left:0; right:0;
    top:0; bottom:0;
    margin:auto;

    /*this to solve "the content will not be cut when the window is smaller than the content": */
    max-width:100%;
    max-height:100%;
    overflow:auto;
`;


class OverlayAbout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.overlayInfo) {
            return (
                <div>
                    <OverlayBackground></OverlayBackground>
                    <OverlayInfoWrapper>
                        Here comes a project description.
                    </OverlayInfoWrapper>
                    <ButtonClose/>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }

    }
}

export default connect(mapStateToProps)(OverlayAbout);