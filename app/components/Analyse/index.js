import React from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';

import Clock from '../Clock/index';
import ButtonPlayPause from '../ButtonPlayPause/index';

const mapStateToProps = function(state) {
    return {
      time: state.time,
      data: state.data,
      vendor: state.vendor
    }
}

const AnalyseWrapperDiv = styled.div`
    position: absolute;
    width: 300px;
    height: 65px;
    padding-top: 13px;
    padding-left: 15px;
    padding-bottom: 12px;
    background: ${props => props.theme.colorPrimaryDark};
    bottom: 0px;
    right: 25%;
    left: 50%;
    margin-left: -150px;
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
                    <ButtonPlayPause type="play"/>
                    <ButtonPlayPause type="pause"/>
                </FlexWrapper>
            </AnalyseWrapperDiv>
        )
    }
}

export default connect(mapStateToProps)(AnalyseWrapper);