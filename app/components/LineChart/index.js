import React from 'react';
import { connect } from "react-redux";

import { setTime, setHighlightedDistrict, setMouseDown } from '../../../store/actions/index';

import { 
    select as d3Select,
    scaleLinear as d3ScaleLinear,
    scaleTime as d3ScaleTime,
    line as d3Line,
    area as d3Area,
    axisBottom as d3AxisBottom,
    bisector as d3Bisector,
    axisLeft as d3AxisLeft,
    mouse as d3Mouse,
    interpolateNumber as d3InterpolateNumber
} from 'd3';

const mapStateToProps = function(state) {
    return {
      time: state.time,
      mouseIsDown: state.mouseIsDown
    }
}

class LineChart extends React.Component {
    constructor(props) {
        super(props);

        this.svg = null;
        this.svgVis = null;
        this.width = null;
        this.height = null;
        this.bars = null;
        this.areaShape = null;
        this.highlightedBar = null;

        this.colors = ['#ef8a62', '#FFFFFF']

        this.x = null;
        this.y = null;
        this.trailsScale = null;

        this.marginRight = 20;
        this.marginLeft = this.props.marginLeft;
        this.marginBottom = 40;
        this.marginTop = 30;

        this.line = null;
        this.lineDefault = null;
        this.areaDefault = null;
        this.area = null;

        this.isDown = true;

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

        if (this.props.id != 'tripsTotal') {
            this.svg
                .attr('style', 'opacity: .5;')
        }

        this.svgVis = this.svg.append('g')
            .attr('transform', `translate(${this.marginLeft},${this.marginTop})`);

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
                    .attr('id', `${this.props.id}-count-${i}`)
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

        let time = (this.props.date.getTime() - 60 * 60 * 1000);

        this.x = d3ScaleTime()
            .domain([time, time + (24 * 60 * 60 * 1000)])
            .range([0, this.width - this.marginLeft - this.marginRight])
            .nice()

        this.trailsScale = d3ScaleLinear()
            .domain([0,99999])
            .range([time, time + (24 * 60 * 60 * 1000)])

        this.y = d3ScaleLinear()
            .domain([this.props.domainY, 0])
            .range([0, this.height - this.marginBottom - this.marginTop]);

        this.xAxis = d3AxisBottom(this.x).ticks(4);
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
            .text(this.props.yAxisLabel)
            .classed('axisLabel', true)
            .classed('focus', true)
            .attr("transform", "translate("+ 1 +"," + (this.marginTop - 15) + ")")

        this.createLegend();
    }

    updateMarker = () => {
        if (this.data != null) {
            this.data.forEach((set, i) => {
                let marker = d3Select(`#${this.props.id}-marker-${i}`)

                let date = this.trailsScale(this.props.time);
                
                marker.style('display', 'inherit');
                marker.attr('cx', this.x(date))
                marker.attr('cy', this.getMarkerY(set, date))

                if (set[index] != undefined) {
                    var index = this.bisect(set, date)
                    let datum = set[index].value;
        
                    d3Select(`#${this.props.id}-count-${i}`).text(datum);
                }
    
            })
        }
    }

    transformData = () => {

        let sets = [];

        this.props.data.forEach((dataset,i) => {
            let arr = [];
            let add = 600000;
            let dateCurrent = this.props.date.getTime();

            dataset.forEach(value => {
                arr.push({ date: dateCurrent, value: value });
                dateCurrent += add;
            });

            sets.push(arr);

            this.drawLine(arr, this.colors[i], i);
        })
        this.data = sets;
    }

    updateChart = () => {
        let sets = [];

        this.props.data.forEach((dataset,i) => {
            let arr = [];
            let add = 600000;
            let dateCurrent = this.props.date.getTime();

            dataset.forEach(value => {
                arr.push({ date: dateCurrent, value: value });
                dateCurrent += add;
            });

            sets.push(arr);

            this.updateShape(arr, i);
        })
        this.data = sets;
    }

    updateShape = (data, index) => {

        d3Select(`#${this.props.id}-pathShape-${index}`)
            .datum(data)
            .transition()
            .duration(500)
            .attr("d", this.line)

        d3Select(`#${this.props.id}-areaShape-${index}`)
            .datum(data)
            .transition()
            .duration(500)
            .attr("d", this.line)
    }

    dispatchHighlightedDistrict = (district) => {
        this.props.dispatch(setHighlightedDistrict(district))
    }

    drawLine = (data, color, index) => {

        this.areaDefault = d3Area()
            .defined(d => !isNaN(d.value))
            .x(d => this.x(d.date))
            .y0(d => this.y(0))
            .y1(70)

        this.area = d3Area()
            .defined(d => !isNaN(d.value))
            .x(d => this.x(d.date))
            .y0(d => this.y(d.value))
            .y1(70)

        this.svgVis.append("linearGradient")
            .attr("id", "lidl-gradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", 0).attr("y1", this.y(20))
            .attr("x2", 0).attr("y2", this.y(0))
          .selectAll("stop")
            .data([
              {offset: "0%", color: "#ef8a62"},
              {offset: "100%", color: "#292929"}
            ])
          .enter().append("stop")
            .attr("offset", function(d) { return d.offset; })
            .attr("stop-color", function(d) { return d.color; });

        this.line = d3Line()
            .defined(d => !isNaN(d.value))
            .x(d => this.x(d.date))
            .y(d => this.y(d.value))

        this.lineDefault = d3Line()
            .defined(d => !isNaN(d.value))
            .x(d => this.x(d.date))
            .y(d => this.y(0))
      

        this.svgVis.append("rect")
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('fill', 'black')
            .attr('fill-opacity', '0')

        this.areaShape = this.svgVis.append("path")
            .datum(data)
            .attr("fill", "red")
            .attr('id', `${this.props.id}-areaShape-${index}`)
            .attr("class", "area")
            .attr("d", this.areaDefault)
            .transition()
            .duration(500)
            
        this.areaShape
            .attr("d", this.area)
            .transition()
            .duration(500)

        this.pathShape = this.svgVis.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr('id', `${this.props.id}-pathShape-${index}`)
            .attr("stroke", color)
            .attr("stroke-width", 2)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", this.lineDefault)
            .transition()
            .duration(500)
            
        this.pathShape    
            .attr("d", this.line)
            .transition()
            .duration(500)

        this.svgVis.append('circle')
            .attr('r', 4)
            .attr('id', `${this.props.id}-marker-${index}`)
            .style('display', 'none')
            .style('fill', this.colors[index])
            .style('pointer-events', 'none')
            .style('stroke', '#292929')
            .style('stroke-width', '2px')

        this.svgVis
            .on('mouseover', () => { 
                d3Select(`#${this.props.id}-marker-0`).style('display', 'inherit'); 
                d3Select(`#${this.props.id}-marker-1`).style('display', 'inherit');
                
                if (this.props.id != 'tripsTotal') {
                    this.svg
                        .attr('style', 'opacity: 1;')
                }

                this.dispatchHighlightedDistrict(this.props.yAxisLabel);
            })
            .on('mouseout', () => { 
                d3Select(`#${this.props.id}-marker-0`).style('display', 'none'); 
                d3Select(`#${this.props.id}-marker-1`).style('display', 'none'); 
                this.dispatchHighlightedDistrict(null);

                if (this.props.id != 'tripsTotal') {
                    this.svg
                        .attr('style', 'opacity: .5;')
                }
            })
            .on('mousemove', (d,i,n) => {
                let mouse = d3Mouse(d3Select(n[i]).node());

                this.data.forEach((set, i) => {
                    let marker = d3Select(`#${this.props.id}-marker-${i}`);
                    var date = this.x.invert(mouse[0]);

                    marker.attr('cx', mouse[0]);
                    marker.attr('cy', this.getMarkerY(set, date))

                    marker.attr('cy', this.getMarkerY(set, date))

                    
                    var index = this.bisect(set, date);

                    if (set[index] != undefined) {
                        let datum = set[index].value;
                        d3Select(`#${this.props.id}-count-${i}`).text(datum);
                    }

                    if (this.props.mouseIsDown) {
                        this.props.dispatch(setTime(this.trailsScale.invert(date)));
                    }
                })     
                           
            })
            .on('mousedown', (d, i, n) => {
                this.props.dispatch(setMouseDown(true))
                let mouse = d3Mouse(d3Select(n[i]).node());
                var date = this.x.invert(mouse[0]);
                this.props.dispatch(setTime(this.trailsScale.invert(date)));
            })
            .on("mouseup", () => {
                this.props.dispatch(setMouseDown(false))
            });
    }

    getMarkerY = (data, date) => {
        var index = this.bisect(data, date);

        if (index > 0 && index < data.length) {
            var startDatum = data[index - 1],
            endDatum = data[index]
    
            var interpolate = d3InterpolateNumber(startDatum.value, endDatum.value),
            range = endDatum.date - startDatum.date,
            valueY = interpolate((date % range) / range);
            return this.y(valueY);
        }
    }

    componentDidMount() {
        this.init();
    }

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
          this.updateChart()
        }

        this.updateMarker()
    }

    render() {
        return (
            <div id={this.props.id}></div>
        )
    }
}

export default connect(mapStateToProps)(LineChart);