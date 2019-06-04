import React from 'react';
import { connect } from "react-redux";

import styled from 'styled-components';

const CounterWrapper = styled.div`
    font-family: ${props => props.theme.fontFamily};
    color: ${props => props.theme.colorWhite};
    width: 95px;
    height: 50px;
    
`;

const CountWrapper = styled.div`
    font-weight: bold;
`;


const DateType = styled.div`
    color: ${props => props.theme.colorLight};
`;


const mapStateToProps = function(state) {
    return {
      time: state.time,
      data: state.data,
      vendor: state.vendor,
    }
}

class Counter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CounterWrapper>
                <CountWrapper>{this.props.bikeCount}</CountWrapper>
                <DateType>{this.props.provider}</DateType>
            </CounterWrapper>
        )
    }
}

export default connect(mapStateToProps)(Counter)