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
    width: 710px;
    height: 30px;
    padding: 15px;
    background: ${props => props.theme.colorPrimaryDark};
    top: 0px;
    right: 25%;
    left: 50%;
    align-items: center;
    display: flex;
    flex-direction: row;
    border-radius: 0px 0px ${props => props.theme.borderRadius} ${props => props.theme.borderRadius};
    margin-left: -355px;

    @media screen and (max-width: ${props => props.theme.screenWidthM}) {
        display: none;
    }
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
                <LabelProvider>Anbieter</LabelProvider>
                <ProviderHandle title="Nextbike" id={0}/>
                <ProviderHandle title="LIDL-Bike" id={1}/>
                <div style={{width: 20 +'px'}}></div>
                <LabelProvider>Ansicht</LabelProvider>
                <CameraHandle></CameraHandle>
            </FilterWrapperDiv>
        ) 
    }
}

export default connect(mapStateToProps)(FilterWrapper);