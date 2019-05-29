import React from 'react';
import { connect } from "react-redux";

import styled from "styled-components";

const ButtonSpan = styled.span`
    border: 1px solid;
    font-family: ${props => props.theme.fontFamily};
    color: ${props => props.theme.colorWhite};
    border-radius: 3px;
    cursor: pointer;
    padding: 1px 5px 2px 5px;
`;

function mapStateToProps(state) {
    return {
      time: state.time
    };
}

function Button(props) {
    return (
        <ButtonSpan>{props.title}</ButtonSpan>
    )
}

export default connect(mapStateToProps)(Button);