import React from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
// import { setBarCurrent, setHistogram, setUpdateHistogram } from '../../../store/actions/index'

import { 
    select as d3Select,
    selectAll as d3SelectAll,
    scaleLinear as d3ScaleLinear
} from 'd3';


const mapStateToProps = function(state) {
    return {
      districtsMetadata: state.districtsMetadata,
      time: state.time,
    }
}

const ChartWrapper = styled.div`
    width: 328px;
    height: 40px;
    margin: 0px 20px 0px 10px;
    display: block;
    font-family: ${props => props.theme.fontFamily};
    font-size: 16px;
    font-family:

    @media screen and (max-width: ${props => props.theme.screenWidthM}) {
        display: none;
    }
`

class DistrictsChart extends React.Component {
    constructor(props) {
        super(props);

        this.data = null;

        this.container = null;
        this.svg = null;
        this.bars = null;

        this.districtsDomain = null;

        this.margin = {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10,
        }

        this.width = null;
        this.height = null;

        this.dict = {
            start: 'arrStart',
            end: 'arrEnd'
        }

    }

    init = () => {
        if (this.container.node() != null) {

            this.data = this.props.data[this.dict[this.props.type]];

            let dimensions = this.container.node().getBoundingClientRect();

            this.width = dimensions.width;
            this.height = dimensions.height;
    

            const y = d3ScaleLinear()
                .domain([0, this.props.max])
                .range([0, this.height]);

            const x = d3ScaleLinear()
                .domain([0, this.data.length])
                .range([0, this.width])

            this.svg = this.container.append('svg')
                .attr('width', this.width)
                .attr('height', this.height)

            this.bars = this.svg.append('g')
                .attr('fill', 'white')
                .selectAll('rect')
                .data(this.data.map((d) => { return d } ))
                .join('rect')
                    .attr('x', (d,i) => { return x(i) + 1 })
                    .attr('width', '1px')
                    .attr('y', d => { return this.height - y(d) })
                    .attr('height', d => { return y(d); })
                    .attr('id', (d,i) => { return `${i}` })
                    .attr('class', 'district-bar')
            
        }
    }

    componentDidMount() {
        this.container = d3Select(`#${this.props.id}`);
        this.init()
    }

    componentDidUpdate() {

    }

    render() {
        if (this.props.data == null || this.props.districtsMetadata == null) {
            return (
                <span>
                    Data is being loaded ...
                </span>
            )
        } else {
            return (
                <ChartWrapper id={this.props.id}>
                    {this.props.name}
                </ChartWrapper>
            )
        }
    }
}

export default connect(mapStateToProps)(DistrictsChart);