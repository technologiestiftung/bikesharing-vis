import React from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';

import Clock from '../Clock/index';

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
    height: 100px;
    padding: 15px;
    background: ${props => props.theme.colorPrimaryDark};
    bottom: 0px;
    right: 25%;
    left: 50%;
    margin-left: -150px;
`;


class AnalyseWrapper extends React.Component {
    constructor(props) {
        super(props);
    } 

    render() {
        return (
            <AnalyseWrapperDiv>
                <Clock/>
            </AnalyseWrapperDiv>
        )
    }
}

export default connect(mapStateToProps)(AnalyseWrapper);