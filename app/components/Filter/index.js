import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import classNames from 'classnames';

import ProviderHandle from '../ProviderHandle/index.js';
import CameraHandle from '../CameraHandle/index.js';

function mapStateToProps(state) {
    return {
      time: state.time
    };
}

const FilterWrapperDiv = styled.div`
    position: absolute;
    width: 900px;
    height: 30px;
    padding: 15px;
    background: ${props => props.theme.colorPrimaryDark};
    top: 0px;
    right: 25%;
    left: 50%;
    align-items: center;
    display: flex;
    flex-direction: row;
    border-radius: 0px 0px 4px 4px;
    margin-left: -450px;
`;

const LabelProvider = styled.div`
    font-weight: bold;
    font-family: ${props => props.theme.fontFamily};
    color: white;
    margin-right: 15px;
`;

class FilterWrapper extends React.Component {
    render() {
        return(
            <FilterWrapperDiv>
                <LabelProvider>Provider</LabelProvider>
                <ProviderHandle title="Nextbike" id={0}/>
                <ProviderHandle title="LIDL-Bike" id={1}/>
                <ProviderHandle title="Mobike" id={2}/>
                <LabelProvider>Stories</LabelProvider>
                <CameraHandle>Berlin Tiergarten</CameraHandle>
            </FilterWrapperDiv>
        ) 
    }
}

export default connect(mapStateToProps)(FilterWrapper);