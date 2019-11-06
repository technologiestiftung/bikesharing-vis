import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import LogoSvg from '../Logo/index';

import { toggleOverlayInfo } from "../../../store/actions";



function mapStateToProps(state) {
    return {
        overlayInfo: state.overlayInfo,
    };
}
import chartIntro from './../../../assets/movies/line.gif';
import navIntro from './../../../assets/movies/nav.gif';
import scenarioIntro from './../../../assets/movies/scenario.gif';

const OverlayBackground = styled.div`
    width: 100%;
    z-index: 10;
    height: 100%;
    background: ${props => props.theme.colorPrimaryDark};
    opacity: .75;
    position: absolute;
    top: 0;
    left: 0;
`;

const AboutTitle = styled.h3`
    font-size: 18px !important;
    &:nth-of-type(even) {
        margin-top: 30px !important;
    }
`;

const OverlayInfoLogo = styled.svg`
    display: none;
    z-index: -1;
    @media screen and (max-width: ${props => props.theme.screenWidthM}) {
        z-index: -1;
        display: block;
        height: 75px;
        margin-top: 20px;
    }
`;

const Snippet = styled.span`
    opacity: .5;
    line-height: 160%;
`

const OverlayInfoWrapper = styled.div`
    background: #2a2a2a;
    width: 490px;
    opacity: 1;
    height: 470px;
    z-index: 10;
    border-radius: 5px;
    font-size: 14px;

    position:absolute; /*it can be fixed too*/
    left:0; right:0;
    top:0; bottom:0;
    margin:auto;

    /*this to solve "the content will not be cut when the window is smaller than the content": */
    max-width: 100%;
    max-height: 100%;

    font-family: ${props => props.theme.fontFamily};
    color: white;
    padding: 30px;

    h3 {
        margin-top: 0px;
        font-weight: bold;
        margin-bottom: 10px;
        font-size: 14px;
    }

    p {
        opacity: .75;
        margin: 0;
        line-height: 150%;
    }

    @media screen and (max-width: ${props => props.theme.screenWidthM}) {
        height: 90%;
        width: 90%;
        padding: 0 !important;
        max-width: 90%;
        max-height: 90%;
    }
`;

const Intro = styled.span`
    font-size: 14px;
    line-height: 150%;
`

const ScrollWrapper = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
    height: 480px;
    padding: 10px;

    &::-webkit-scrollbar { width: 0 !important }

    @media screen and (max-width: ${props => props.theme.screenWidthM}) {
        height: 95%;
    }
`

const ProviderLidl = styled.span`
    color: #E68661;
    opacity: 1 !important;
    font-weight: 600;
`;

const ProviderNext = styled.span`
    color: white;
    opacity: 1 !important;
    font-weight: 600;
`;

const Headline = styled.h3`
    margin-top: 5px;
    margin-bottom: 5px !important;
`

const BtnClose = styled.button`
    width: 36px;
    height: 36px;
    background-color: #333333;
    color: white;
    transition: background-color .3s;
    will-change: background-color;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: none;
    border: 3px solid #878787;
    flex-shrink: 0;
    flex-grow: 0;
    box-sizing: border-box;
    position: absolute;
    top: -15px;
    right: -12px;
    z-index: 9999;
    transition: all .125s ease-in-out;

    &:hover {
        border: 3px solid white;
        color: white;
        transition: all .125s ease-in-out;

        svg {
            transition: all .125s ease-in-out;
            fill: white;
        }
    }
`



class OverlayAbout extends React.Component {
    constructor(props) {
        super(props);
    }

    toggleOverlay = () => {
        this.props.dispatch(toggleOverlayInfo(false))
    }


    render() {
        if (this.props.overlayInfo) {
            return (
                <div>
                    <OverlayBackground></OverlayBackground>
                    

                    <OverlayInfoWrapper>

                        <BtnClose onClick={this.toggleOverlay}>
                            <svg className="MuiSvgIcon-root-11" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path><path fill="none" d="M0 0h24v24H0z"></path></svg>
                        </BtnClose>

                        <ScrollWrapper>

                        <OverlayInfoLogo>
                            <LogoSvg/>
                        </OverlayInfoLogo>

                        <br/>


                        <AboutTitle>Über das Projekt</AboutTitle>
                        <Intro>
                        Urbane Mobilität verändert sich stetig. Bikesharing wird seit einigen Jahren immer mehr in Großstädten genutzt, um Räder flexibel in der ganzen Stadt ausleihen und abstellen zu können. Wir haben das Phänomen für Berlin genauer untersucht und die Standortdaten aller Räder der Bikesharing-Anbieter <ProviderNext>Nextbike</ProviderNext> und <ProviderLidl>LIDL-Bike</ProviderLidl> gesammelt.
                        </Intro>

                        <br/>
                        <br/>

                        <Intro>
                        Die Visualisierung zeigt die Nutzung der Angebote ab dem Zeitraum des 02.07.2019. Es werden alle Radbewegungen abgebildet, die größer als 300 Meter sind. So wird sichtbar, zu welchen Uhrzeiten und in welchen Regionen Bikesharing besonders intensiv genutzt wird.
                        </Intro>

                        <br/>
                        <br/>

                        <Intro>
                        Die abgebildeten Routen können von der eigentlichen Route abweichen, da der Algorithmus den schnellsten Weg zwischen zwei Punkten berechnet.
                        </Intro>

                        <br/>
                        <br/>

                        <AboutTitle>Die Visualisierung</AboutTitle>

                        <Headline>Navigation</Headline>
                        <Snippet>Die Navigation ermöglicht es die Zeit zu pausieren, Anbieter ein- & auszublenden und zwischen den Daten tageweise zu wechseln.</Snippet>
                        <br/>
                        <img className="intros" src={navIntro} />
                        <br/>
                        <br/>
                        <br/>
                        <Headline>Ankünfte & Abfahrten pro Bezirk</Headline>
                        <Snippet>Durch <i>klicken</i> oder <i>gedrückt halten</i> auf ein Liniendiagramm ist es möglich durch die Zeit zu navigieren. Es können alle Ankünfte oder Abfahrten in den Bezirken angezeigt werden. Durch hovern über einzelne Liniendiagramme, werden Bezirke auf der Karte hervorgehoben.</Snippet>
                        <br/>
                        <img className="intros" src={chartIntro} />
                        <br/>
                        <br/>
                        <br/>
                        <Headline>Szenarien</Headline>
                        <Snippet>Unter diesem Reiter sind Szenarien zu finden, die sich auf die Stadt Berlin beziehen.</Snippet>
                        <br/>
                        <img className="intros" src={scenarioIntro} />
                        <br/>
                        <br/>
                        </ScrollWrapper>

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