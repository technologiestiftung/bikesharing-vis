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
      activeBikes0: state.activeBikes0,
      activeBikes1: state.activeBikes1,
      activeBikes2: state.activeBikes2,
    }
}

const AnalyseWrapperDiv = styled.div`
    position: absolute;
    width: 900px;
    height: 53px;
    padding-top: 13px;
    padding-left: 15px;
    padding-bottom: 12px;
    background: ${props => props.theme.colorPrimaryDark};
    bottom: 0px;
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
                    <Counter bikeCount={this.props.activeBikes0} provider="LIDL-Bike"/>
                    <Counter bikeCount={this.props.activeBikes1} provider="Nextbike"/>
                    <Counter bikeCount={this.props.activeBikes2} provider="Mobike"/>
                </FlexWrapper>
            </AnalyseWrapperDiv>
        )
    }
}

export default connect(mapStateToProps)(AnalyseWrapper);