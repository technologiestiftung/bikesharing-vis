import React from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import classNames from 'classnames';

import stories from '../../../assets/stories';

const StoryWrapper = styled.div`
    width: 350px;
    height: 330px;
    position: absolute;
    top: 220px;
    left: -450px;
    background: ${props => props.theme.colorPrimaryDark};
    font-family: ${props => props.theme.fontFamily};
    color: white;
    z-index: 1000;
    opacity: 0;
    line-height: 150%;
    transition: all .25s ease;
    padding: 25px;
    border-radius: ${props => props.theme.borderRadius};

    &.visible {
        opacity: 1;
        transform: translateX(425px);
        transition: all .25s ease;
    }

    h2 {
        margin-top: 0;
        font-size: ${props => props.theme.fontSizeXl};
    }

    span {
        color: ${props => props.theme.colorLight};
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
                <h2>{stories[this.props.storyId]['title']}</h2>
                <span>{stories[this.props.storyId]['description']}</span>
            </StoryWrapper>
        )
    }
}

export default connect(mapStateToProps)(Story);