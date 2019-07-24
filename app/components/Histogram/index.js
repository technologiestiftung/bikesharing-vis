import React from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import { setBarCurrent, setHistogram, setUpdateHistogram } from '../../../store/actions/index'
import Slider from '../Slider/index';

import { 
    histogram as d3Histogram,
    select as d3Select,
    selectAll as d3SelectAll,
    scaleLinear as d3ScaleLinear,
    max as d3Max
} from 'd3';

const mapStateToProps = function(state) {
    return {
      histogram: state.histogram,
      time: state.time,
      barCurrent: state.barCurrent,
      provider0: state.provider0,
      provider1: state.provider1,
      provider2: state.provider2,
      vendor: state.vendor,
      histogramNeedsUpdate: state.histogramNeedsUpdate
    }
}

const HistogramWrapper = styled.div`
    width: 328px;
    height: 35px;
    margin: 0px 20px 0px 10px;
    display: block;

    @media screen and (max-width: ${props => props.theme.screenWidthM}) {
        display: none;
    }
`

class Histogram extends React.Component {
    constructor(props) {
        super(props);

        this.svg = null;
        this.width = null;
        this.height = null;
        this.bars = null;
        this.highlightedBar = null;

        this.state = {
            svg: null,
            update: true,
        }

        this.histogramDomain = null;
    }

    init = () => {
        const container = d3Select('#histogram');
        const nodeDimensions = container.node().getBoundingClientRect();

        this.width = nodeDimensions.width;
        this.height = nodeDimensions.height;

        const y = d3ScaleLinear()
            .domain([0, d3Max(this.props.histogram, function(d) { return d[1]; })])
            .range([0, this.height]);

        this.histogramDomain = d3ScaleLinear()
            .domain([0, 99999])
            .range([0, this.props.histogram.length])

        const x = d3ScaleLinear()
            .domain([0,this.props.histogram.length])
            .range([0, this.width])

        this.svg = container.append('svg')
            .attr('width', this.width)
            .attr('height', this.height)

        this.bars = this.svg.append('g')
            .attr('fill', 'white')
            .selectAll('rect')
            .data(this.props.histogram.map((d) => { return d[1]} ))
            .join('rect')
                .attr('x', (d,i) => { return x(i) + 1 })
                .attr('width', '1px')
                .attr('y', d => { return this.height - y(d) })
                .attr('height', d => { return y(d) })
                .attr('id', (d,i) => { return `${i}` })
                .attr('class', 'bar')
    }

    updateHistogram = () => {
        const y = d3ScaleLinear()
            .domain([0, d3Max(this.props.histogram, function(d) { return d[1]; })])
            .range([0, this.height]);

        this.bars.remove()


        const x = d3ScaleLinear()
        .domain([0,this.props.histogram.length])
        .range([0, this.width])

        this.bars = this.svg.append('g')
        .attr('fill', 'white')
        .selectAll('rect')
        .data(this.props.histogram.map((d) => { return d[1]} ))
        .join('rect')
            .attr('x', (d,i) => { return x(i) + 1 })
            .attr('width', '1px')
            .attr('y', d => { return this.height - y(d) })
            .attr('height', d => { return y(d) })
            .attr('id', (d,i) => { return `${i}` })
            .attr('class', 'bar')
    }

    highlightBars() {
        let bars = d3SelectAll('rect.bar')
            .filter((d,i) => { return i < this.props.barCurrent })
            .classed('past', true)
            .classed('active', false);

        let currentBar = d3SelectAll(`rect.bar`)
            .filter((d,i) => { return i == this.props.barCurrent })
            .classed('active', true);
    }

    componentDidUpdate() {
        if (this.state.update && this.props.histogram != null) { 
            this.props.dispatch(setUpdateHistogram(false));
            this.init();
            this.setState({ update: false });
        } else if (!this.state.update && this.props.histogramNeedsUpdate && this.props.histogram != null) {

            this.props.dispatch(setUpdateHistogram(false));
            this.updateHistogram();

            // this.bars.remove()

        }
        
        // highlight histogram bar for current timeslot if histogram data is available
        if (this.props.histogram != null) {
            this.highlightedBar = Math.floor(this.histogramDomain(this.props.time));
            
            this.props.dispatch(setBarCurrent(this.highlightedBar));

            this.bars
                .classed('past', false)
                .classed('active', false);

            
            this.highlightBars()

            if (this.props.barCurrent == this.props.histogram.length - 1) {
                this.bars
                    .classed('past', false)
                    .classed('active', false);
    
            }
        }

    }

    createNestedArray = (length) => {
        let arr = [];
        for (let index = 0; index < length; index++) {
            arr.push([0,0]);
        };

        return arr;
    }

    render() {
        if (this.props.histogram != null) {
            return (
                <HistogramWrapper id="histogram">
                    <Slider/> 
                </HistogramWrapper>
            )
        } else {
            return (
                'Loading ... '
            )
        }
    }


}

export default connect(mapStateToProps)(Histogram);