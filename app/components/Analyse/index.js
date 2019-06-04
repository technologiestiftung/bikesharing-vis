import React from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';

import Clock from '../Clock/index';
import ButtonPlay from '../ButtonPlay/index';
import ButtonPause from '../ButtonPause/index';
import Histogram from '../Histogram/index';
import Counter from '../Counter/index';

const mapStateToProps = function(state) {
    return {
      time: state.time,
      data: state.data,
      vendor: state.vendor,
      provider0: state.provider0,
      provider1: state.provider1,
      provider2: state.provider2,
      barCurrent: state.barCurrent
    }
}

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
`;

const FlexWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const TimeWrapper = styled.div`
    width: 160px;
`;


class AnalyseWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.currentBikes0 = null;
        this.currentBikes1 = null;
        this.currentBikes2 = null;
    } 

    componentDidUpdate() {
        
        if (this.props.provider0[this.props.barCurrent] != undefined) {
            this.currentBikes0 = this.props.provider0[this.props.barCurrent][1];
            this.currentBikes1 = this.props.provider1[this.props.barCurrent][1];
            this.currentBikes2 = this.props.provider2[this.props.barCurrent][1];
        }
    }

    render() {
        return (
            <AnalyseWrapperDiv>
                <FlexWrapper>   
                    <TimeWrapper>
                        <Clock/>
                    </TimeWrapper>
                    <ButtonPlay/>
                    <ButtonPause/>
                    <Histogram/>
                    <Counter bikeCount={this.currentBikes0} provider="Nextbike"/>
                    <Counter bikeCount={this.currentBikes1} provider="LIDL-Bike"/>
                    <Counter bikeCount={this.currentBikes2} provider="Mobike"/>
                </FlexWrapper>
            </AnalyseWrapperDiv>
        )
    }
}

export default connect(mapStateToProps)(AnalyseWrapper);