import React from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";

import { 
    histogram as d3Histogram,
    select as d3Select
} from 'd3';

const mapStateToProps = function(state) {
    return {
      histogram: state.histogram
    }
}

const HistogramWrapper = styled.div`
    background: green;
    width: 200px;
    height: 50px;
`


class Histogram extends React.Component {
    constructor(props) {
        super(props);

        this.svg = null;
        this.width = null;
        this.height = null;

        this.state = {
            svg: null
        }
    }

    init = () => {
        const container = d3Select('#histogram');
        const nodeDimensions = container.node().getBoundingClientRect();

        this.width = nodeDimensions.width;
        this.height = nodeDimensions.height;

        this.svg = container.append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
    }

    componentDidUpdate() {
        this.init()
    }

    render() {
        if (this.props.histogram != null) {
            return <HistogramWrapper id="histogram"></HistogramWrapper>
        } else {
            return (
                'Loading ... '
            )
        }
    }


}

export default connect(mapStateToProps)(Histogram);