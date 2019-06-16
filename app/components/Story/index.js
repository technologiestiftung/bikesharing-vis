import React from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import classNames from 'classnames';

const StoryWrapper = styled.div`
    width: 350px;
    height: 450px;
    position: absolute;
    top: 250px;
    right: -350px;
    background: ${props => props.theme.colorPrimaryDark};
    font-family: ${props => props.theme.fontFamily};
    color: white;
    z-index: 1000;
    opacity: 0;
    transition: all .25s ease;

    &.visible {
        opacity: 1;
        transform: translateX(-350px);
        transition: all .25s ease;
    }
`;

function mapStateToProps(state) {
    return {
      animate: state.animate,
      viewport: state.viewport,
      transitionDuration: state.transitionDuration,
      vendor: state.vendor,
      time: state.time,
      storyId: state.storyId,
      storyVisible: state.storyVisible 
    };
}

class Story extends React.Component {
    render() {
        var storyWrapperClass = classNames({
            visible: this.props.storyVisible,
            // 'btn-pressed': this.containsProvider(),
            // 'btn-over': !this.props.buttonPlay && this.state.isHovered,
        });

        return (
            <StoryWrapper className={storyWrapperClass}>
                Here Comes the Story
            </StoryWrapper>
        )
    }
}

export default connect(mapStateToProps)(Story);