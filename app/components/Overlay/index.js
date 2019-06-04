import React from "react";
import styled from "styled-components";

const OverlayWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: red;
    opacity: 0;
`;

function mapStateToProps(state) {
    return {
          time: state.time,
          animate: state.animate,
          timeOffset: state.timeOffset,
          viewport: state.viewport,
          loaded: state.loaded,
          data: state.data
    };
  }

class Overlay extends React.Component {
    render() {
        return (
            <OverlayWrapper></OverlayWrapper>
        )
    }
}

export default Overlay;