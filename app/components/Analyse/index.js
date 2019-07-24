import React from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';

import DaySelector from '../DaySelector/index';
import Clock from '../Clock/index';
import ButtonPlay from '../ButtonPlay/index';
import ButtonPause from '../ButtonPause/index';
import ButtonForward from '../ButtonForward/index';
import ButtonBackward from '../ButtonBackward/index';
import Histogram from '../Histogram/index';
import Counter from '../Counter/index';

import ProviderHandle from '../ProviderHandle/index.js';
import CameraHandle from '../CameraHandle/index.js';

const mapStateToProps = function(state) {
    return {
      time: state.time,
      data: state.data,
      vendor: state.vendor,
      provider0: state.provider0,
      provider1: state.provider1,
      provider2: state.provider2,
      barCurrent: state.barCurrent,
      timeExtend: state.timeExtend
    }
}

const LabelProvider = styled.div`
    font-weight: bold;
    font-family: ${props => props.theme.fontFamily};
    color: white;
    margin-right: 15px;
`;

const AnalyseWrapperDiv = styled.div`
    position: absolute;
    width: 900px;
    height: 40px;
    padding-top: 13px;
    padding-left: 15px;
    padding-bottom: 12px;
    background: ${props => props.theme.colorPrimaryDark};
    bottom: 0px;
    border-radius: 4px 4px 0px 0px;
    right: 25%;
    left: 50%;
    margin-left: -450px;

    @media screen and (max-width: ${props => props.theme.screenWidthM}) {
        width: 100%;
        left: 0;
        right: 0;
        height: 40px;
        margin-left: 0;
    }
`;

const FlexwrapperLarge = styled.div`
    display: flex;
    flex-direction: row;

    @media screen and (max-width: ${props => props.theme.screenWidthM}) {
        display: none;
    }
`;

const FlexWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: auto;
`;

const FlexWrapperWrapped = styled.div`
    display: flex;
    flex-direction: row;

    @media screen and (max-width: ${props => props.theme.screenWidthM}) {
        justify-content: center;
    }
`;

const TimeWrapper = styled.div`
    width: 190px;

    @media screen and (max-width: ${props => props.theme.screenWidthM}) {
        width: 150px;
    }
`;


class AnalyseWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.currentBikes0 = null;
        this.currentBikes1 = null;
    } 

    componentDidUpdate() {
        
        if (this.props.provider0[this.props.barCurrent] != undefined) {
            this.currentBikes0 = this.props.provider0[this.props.barCurrent][1];
            this.currentBikes1 = this.props.provider1[this.props.barCurrent][1];
        }
    }

    render() {
        return (
            <AnalyseWrapperDiv>
                <FlexWrapperWrapped>   
                    <TimeWrapper>
                        <Clock/>
                    </TimeWrapper>

                    <FlexWrapper>
                        <ButtonBackward/>
                        <ButtonPlay/>
                        <ButtonPause/>
                        <ButtonForward/>
                    </FlexWrapper>

                    <Histogram/>

                    <FlexwrapperLarge>
                        <Counter bikeCount={this.currentBikes0} provider="Nextbike"/>
                        <Counter bikeCount={this.currentBikes1} provider="LIDL-Bike"/>
                    </FlexwrapperLarge>
                </FlexWrapperWrapped>
            </AnalyseWrapperDiv>
        )
    }
}

export default connect(mapStateToProps)(AnalyseWrapper);