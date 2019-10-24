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
    bisector as d3Bisector,
    axisLeft as d3AxisLeft,
    mouse as d3Mouse,
    interpolateNumber as d3InterpolateNumber
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
      histogramNeedsUpdate: state.histogramNeedsUpdate,
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

        this.colors = ['#ef8a62', '#FFFFFF']

        this.x = null;
        this.y = null;
        this.trailsScale = null;

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
        this.groupLegend = null;
        this.marker = null;

        this.bisect = null;

        this.dataLidl = null;
        this.dataNext = null;

        this.data = null;

        this.state = {
            svg: null,
            update: true,
            currentRides: [50, 24]
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

        this.groupLegend = this.svg.append("g")
            .attr("id", "groupLegend")

        this.bisect = d3Bisector(datum => {
            return datum.date;
        }).right;

        this.createAxis();
    }

    createLegend = () => {
        const spacing = 70;
        let wrapperLegend = this.groupLegend.append('g')
            .attr("transform", `translate(${this.width - 150},${0})`)

        this.props.legend.forEach((label,i) => {
                
                wrapperLegend.append('text')
                    .attr('id', `count-${label}`)
                    .attr('fill', this.colors[i])
                    .attr("transform", `translate(${this.width - 185 - (i * spacing)},${this.marginTop - 15})`)
                    .text(this.state.currentRides[i])
                    .attr('style', 'font-weight: bold;')
                
                wrapperLegend.append('text')
                    .attr("transform", `translate(${this.width - 170 - (i * spacing)},${this.marginTop - 15})`)
                    .text(label)
                    .attr('fill', this.colors[i])

        })
        this.transformData();
    }

    createAxis = () => {

        this.x = d3ScaleTime()
            .domain([this.props.date.getTime(), this.props.date.getTime() + 21 * 60 * 60 * 1000])
            .range([0, this.width - this.margin - this.marginLeft])
            .nice()

        this.trailsScale = d3ScaleLinear()
            .domain([0,99999])
            .range([this.props.date.getTime(), this.props.date.getTime() + 21 * 60 * 60 * 1000])

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

        this.createLegend();
    }

    updateMarker = () => {
        if (this.data != null) {
            let date = this.trailsScale(this.props.time);
            this.marker.style('display', 'inherit');
            this.marker.attr('cx', this.x(date))
            this.marker.attr('cy', this.getMarkerY(this.data, date))

            var index = this.bisect(this.data, date),
            datum = this.data[index].value;

            d3Select('#count-LidlBike').text(datum);


            // console.log(endDatum);
        }
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
        this.data = data;
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


        this.marker = this.svg.append('circle')
            .attr('r', 4)
            .style('display', 'none')
            .style('fill', '#ef8a62')
            .style('pointer-events', 'none')
            .style('stroke', '#303030')
            .style('stroke-width', '2px')
            .attr('transform', 'translate(16,30)');

        this.svg
            .on('mouseover', () => { this.marker.style('display', 'inherit'); })
            .on('mouseout', () => { this.marker.style('display', 'none'); })
            .on('mousemove', (d,i,n) => {
                let mouse = d3Mouse(d3Select(n[i]).node());

                this.marker.attr('cx', mouse[0]);
                var date = this.x.invert(mouse[0]);

                this.marker.attr('cy', this.getMarkerY(this.data, date))

                var index = this.bisect(this.data, date),
                datum = this.data[index].value;
    
                d3Select('#count-LidlBike').text(datum);
            })
    }

    getMarkerY = (data, date) => {
        var index = this.bisect(data, date),
        startDatum = data[index - 1],
        endDatum = data[index],
        interpolate = d3InterpolateNumber(startDatum.value, endDatum.value),
        range = endDatum.date - startDatum.date,
        valueY = interpolate((date % range) / range);
        return this.y(valueY);
    }

    componentDidMount() {
        this.init();
    }

    componentDidUpdate() {
        this.updateMarker()
    }

    render() {
        return (
            <div id={this.props.id}></div>
        )
    }
}

export default connect(mapStateToProps)(LineChart);