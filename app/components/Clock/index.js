import React from 'react';
import { connect } from "react-redux";
import { scaleLinear as d3ScaleLinear } from 'd3';

import styled from 'styled-components';

const DateWrapper = styled.div`
    font-family: ${props => props.theme.fontFamily};
    color: ${props => props.theme.colorWhite};
`;

const TimeWrapper = styled.div`
    font-size: ${props => props.theme.fontSizeXl};
    font-weight: bold;
`;

const DateType = styled.div`
    color: ${props => props.theme.colorLight};
`;

function mapStateToProps(state) {
    return {
      time: state.time
    };
}

const monthDict = { 
    3: 'April'
}

const dayDict = { 
    5: 'Samstag',
    6: 'Sonntag'
}

const timeFirst = 1555020005777;
const timeLast = 1555192562992;

function Clock(props) {

    function currentTime(val) {
        const calc = d3ScaleLinear(val)
            .domain([0, 99999])
            .range([timeFirst, timeLast])

        const date = new Date(Math.round(calc(val)));
        const hour = Number(date.getHours());

        
        
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        
        const hourTwoDigits = hour < 10 ? `0${hour}` : hour;
        const minutesTwoDigits = minutes < 10 ? `0${minutes}` : minutes;
        const secondsTwoDigits = seconds < 10 ? `0${seconds}` : seconds;


        return `${hourTwoDigits}:${minutesTwoDigits}:${secondsTwoDigits}`;
    }

    function currentDate(val) {

        const calc = d3ScaleLinear(val)
            .domain([0, 99999])
            .range([timeFirst, timeLast])

        const date = new Date(Math.round(calc(val)));

        const month = monthDict[date.getMonth()];
        const day = dayDict[date.getDay()];
        const dateDay = date.getDate();

        const dateStr = `${day}, ${dateDay} ${month}`
        
        return dateStr;
    }

    function msToTime(s) {

        // Pad to 2 or 3 digits, default is 2
        function pad(n, z) {
          z = z || 2;
          return ('00' + n).slice(-z);
        }
      
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;
      
        return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
      }

    return (
        <DateWrapper className="clock-wrapper">
            <TimeWrapper>{currentTime(props.time)}</TimeWrapper>
            <DateType>{currentDate(props.time)}</DateType>
        </DateWrapper>
    );
}

export default connect(mapStateToProps)(Clock);