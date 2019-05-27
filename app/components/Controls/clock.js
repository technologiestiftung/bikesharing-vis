import React from 'react';
import { connect } from "react-redux";
import { scaleLinear as d3ScaleLinear } from 'd3';

function mapStateToProps(state) {
    return {
      time: state.time
    };
}

const linearTimeScale = (val) => {
    const timeFirst = 1555020005777;
    const timeLast = 1555192562992;

    return d3ScaleLinear(val)
        .domain([0, 99999])
        .range([timeFirst, timeLast])
}

function Clock(props) {
    return (
        <div className="clock-wrapper">
            {/* <span>{() => { return linearTimeScale(props.time)}}</span> */}
        </div>
    );
}

export default connect(mapStateToProps)(Clock);