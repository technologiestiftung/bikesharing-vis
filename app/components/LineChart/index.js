import React from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";

import { 
    histogram as d3Histogram,
    select as d3Select,
    selectAll as d3SelectAll,
    scaleLinear as d3ScaleLinear,
    scaleTime as d3ScaleTime,
    max as d3Max,
    line as d3Line,
    axisBottom as d3AxisBottom,
    axisLeft as d3AxisLeft,
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

class LineChart extends React.Component {
    constructor(props) {
        super(props);

        this.svg = null;
        this.width = null;
        this.height = null;
        this.bars = null;
        this.highlightedBar = null;

        this.x = null;
        this.y = null;

        this.margin = 5;
        this.marginLeft = 25;
        this.marginBottom = 40;
        this.marginTop = 30;

        this.line = null;

        this.yMax = null;
        this.xMax = null;

        this.xAxis = null;
        this.yAxis = null;

        this.height = 135;
        this.width = 280;

        this.container = null;
        this.groupAxis = null;

        this.dataLidl = null;
        this.dataNext = null;

        this.state = {
            svg: null,
            update: true,
        }

        this.histogramDomain = null;
    }

    init = () => {
        this.container = d3Select(`#${this.props.id}`);

        this.svg = this.container.append('svg')
            .classed('chart', true)
            .attr('width', this.width)
            .attr('height', this.height)


        this.groupAxis = this.svg.append("g")
            .attr("id", "groupAxis")
        

        this.createAxis();
    }

    createAxis = () => {

        this.x = d3ScaleTime()
            .domain([this.props.date.getTime(), this.props.date.getTime() + 21 * 60 * 60 * 1000])
            .range([0, this.width - this.margin - this.marginLeft])
            .nice()

        this.y = d3ScaleLinear()
            .domain([40, 0])
            .range([0, this.height - this.marginBottom - this.marginTop]);

        this.xAxis = d3AxisBottom(this.x).ticks(5);
        this.yAxis = d3AxisLeft(this.y).ticks(3);

        this.groupAxis.append("g")
            .attr("class", "xAxis axis")
            .attr("transform", "translate("+ this.marginLeft +"," + (97) + ")")
            .call(this.xAxis)
        
        this.groupAxis.append("g")
            .attr("class", "yAxis axis")
            .attr("transform", "translate("+ this.marginLeft +"," + this.marginTop + ")")
            .call(this.yAxis)
        
        this.groupAxis.append('text')
            .text('Tageszeit')
            .classed('axisLabel', true)
            .attr("transform", "translate("+ 10 +"," + (130) + ")")
        
        this.groupAxis.append('text')
            .text('Radfahrten')
            .classed('axisLabel', true)
            .attr("transform", "translate("+ 1 +"," + (this.marginTop - 15) + ")")

        this.transformData();
    }

    transformData = () => {
        console.log(this.props.lidl, this.props.date.getFullYear());

        let arr = [];
        let total = this.props.lidl.length;
        let add = 600000;
        let dateCurrent = this.props.date.getTime();

        this.props.lidl.forEach(value => {
            arr.push({ date: dateCurrent, value: value });
            dateCurrent += add;
        });

        this.drawLine(arr);
    }

    drawLine = (data) => {
        this.line = d3Line()
            .defined(d => !isNaN(d.value))
            .x(d => this.x(d.date))
            .y(d => this.y(d.value))

        this.svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#ef8a62")
            .attr("stroke-width", 2)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr('transform', 'translate(16,30)')
            .attr("d", this.line);
    }

    componentDidMount() {
        this.init();
    }

    render() {
        return (
            <div id={this.props.id}></div>
        )
    }
}

export default connect(mapStateToProps)(LineChart);