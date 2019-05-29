import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Button from '../Button/index.js';

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
    margin-left: -150px;
`;

class FilterWrapper extends React.Component {
    render() {
        return(
            <FilterWrapperDiv>
                <Button title="Test title" type="play"/>
            </FilterWrapperDiv>
        ) 
    }
}

export default connect(mapStateToProps)(FilterWrapper);