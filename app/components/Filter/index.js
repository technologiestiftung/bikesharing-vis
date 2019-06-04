import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import classNames from 'classnames';

import ProviderHandle from '../ProviderHandle/index.js';

function mapStateToProps(state) {
    return {
      time: state.time
    };
}

const FilterWrapperDiv = styled.div`
    position: absolute;
    width: 300px;
    height: 50px;
    padding: 15px;
    background: ${props => props.theme.colorPrimaryDark};
    top: 0px;
    right: 25%;
    left: 50%;
    border-radius: 0px 0px 4px 4px;
    margin-left: -150px;
`;

class FilterWrapper extends React.Component {
    render() {
        return(
            <FilterWrapperDiv>
                <ProviderHandle title="Nextbike" id={0}/>
                <ProviderHandle title="LIDL-Bike" id={1}/>
                <ProviderHandle title="Mobike" id={2}/>
            </FilterWrapperDiv>
        ) 
    }
}

export default connect(mapStateToProps)(FilterWrapper);