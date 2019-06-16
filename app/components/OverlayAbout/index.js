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
    width: 490px;
    opacity: 1;
    height: 470px;
    border-radius: 5px;

    position:absolute; /*it can be fixed too*/
    left:0; right:0;
    top:0; bottom:0;
    margin:auto;

    /*this to solve "the content will not be cut when the window is smaller than the content": */
    max-width:100%;
    max-height:100%;
    overflow:auto;

    font-family: ${props => props.theme.fontFamily};
    color: white;
    padding: 30px;

    h3 {
        margin-top: 0px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    p {
        opacity: .5;
        margin: 0;
        line-height: 150%;
    }
`;

const sectionHeadline = styled.h3`

`;

const sectionText = styled.span`

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
                        <h3>Über das Projekt</h3>
                        <p>
                        Urbane Mobilität verändert sich stetig. Bikesharing wird seit einigen Jahren immer mehr in Großstädten genutzt, um Räder flexibel in der ganzen Stadt ausleihen und abstellen zu können. Wir haben das Phänomen für Berlin genauer untersucht und die Standortdaten aller Räder der Bikesharing-Anbieter Nextbike, LIDL-Bike und Mobike gesammelt.

                        <br/>
                        <br/>

                        Die Visualisierung zeigt die Nutzung der Angebote für den Zeitraum vom 12. – 13.04.2019. Es werden alle Radbewegungen abgebildet, die größer als 750 Meter sind. So wird sichtbar, zu welchen Uhrzeiten und in welchen Regionen Bikesharing besonders intensiv genutzt wird.

                        <br/>
                        <br/>

                        (Die abgebildeten Routen können von der eigentlichen Route abweichen, da der Algorithmus den schnellsten Weg zwischen zwei Punkten berechnet).
                        </p>
                        <br/>
                        <ButtonClose/>
                    </OverlayInfoWrapper>
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