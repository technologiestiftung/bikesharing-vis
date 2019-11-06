import React from 'react';
import { connect } from "react-redux";
import { toggleOverlayInfo } from "../../../store/actions";
import styled from 'styled-components';

function mapStateToProps(state) {
    return {
        districtsMetadata: state.districtsMetadata,
    };
}

class HowTo extends React.Component {
    constructor(props) {
        super(props);
    }

    toggleOverlay = () => {
        this.props.dispatch(toggleOverlayInfo(true))
    }

    render() {
        return (
            <div className={'HowTo wrapper'} onClick={this.toggleOverlay}>
                <div className={'icon'}>
                    <span>?</span>
                </div>
                <span>Wie funktioniert die Visualisierung?</span>
            </div>
        )
    }
}

export default connect(mapStateToProps)(HowTo);