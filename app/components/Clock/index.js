import React from 'react';
import { connect } from "react-redux";
import { scaleLinear as d3ScaleLinear } from 'd3';
import { setSelectedDatasetIndex, setSelectedDataset, toggleUpdate } from '../../../store/actions/index';

import styled from 'styled-components';

const DateWrapper = styled.div`
    font-family: ${props => props.theme.fontFamily};
    color: ${props => props.theme.colorWhite};
`;

const TimeWrapper = styled.div`
    font-weight: bold;
`;

const FlexWrapper = styled.div`
    display: flex;
    flex-direction: row:
`;

const DateType = styled.div`
    color: ${props => props.theme.colorLight};
`;

function mapStateToProps(state) {
    return {
      time: state.time,
      timeExtend: state.timeExtend,
      datasets: state.datasets,
      selectedDatasetIndex: state.selectedDatasetIndex,
    };
}

const monthDict = { 
    3: 'April',
    4: 'Mai',
    5: 'Juni',
    6: 'Juli',
    7: 'August',
    8: 'September',
    9: 'Oktober',
    10: 'November',
    11: 'Dezember',
}

const dayDict = { 
    0: 'Mo',
    1: 'Di',
    2: 'Mi',
    3: 'Do',
    4: 'Fr',
    5: 'Sa',
    6: 'So'
}

function Clock(props) {

    const timeFirst = props.timeExtend[0];
    const timeLast = props.timeExtend[1];

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

    function currentDate(val, props) {

        if (props.timeExtend.length > 0) {
            
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

    }

    function handleClick(cmd, props)  {
        
        if (props.datasets != null) {
            
            const datasetsLength = props.datasets.length - 1;
            
            if (cmd == 'next') {
                let oldIndex = props.selectedDatasetIndex;
                const newIndex = props.selectedDatasetIndex == datasetsLength ? 0 : oldIndex + 1;
                props.dispatch(toggleUpdate(true));
                props.dispatch(setSelectedDatasetIndex(newIndex));
                props.dispatch(setSelectedDataset(props.datasets[props.selectedDatasetIndex][1]));
            }
            
            if (cmd == 'previous') {
                let oldIndex = props.selectedDatasetIndex;
                const newIndex = props.selectedDatasetIndex == 0 ? datasetsLength : oldIndex - 1;
                props.dispatch(toggleUpdate(true));
                props.dispatch(setSelectedDatasetIndex(newIndex));
                props.dispatch(setSelectedDataset(props.datasets[props.selectedDatasetIndex][1]));
            }
        }

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
            <FlexWrapper>
                <span onClick={() => handleClick('previous', props)} >
                    <svg style={{marginRight: 5 + 'px'}} width="11px" height="12px" viewBox="0 0 8 9" version="1.1">
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Artboard" transform="translate(-112.000000, -70.000000)" fill="#FFFFFF">
                                <polygon id="Rectangle" transform="translate(118.318019, 74.818019) rotate(-225.000000) translate(-118.318019, -74.818019) " points="120.228388 70.8180195 122.318019 78.8180195 114.318019 76.7283885"></polygon>
                            </g>
                        </g>
                    </svg>
                </span>

                <span onClick={() => handleClick('next', props) } >
                    <svg style={{marginRight: 10 + 'px'}} width="11px" height="12px" viewBox="0 0 8 9" version="1.1">
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Artboard" transform="translate(-116.000000, -70.000000)" fill="#FFFFFF">
                                <polygon id="Rectangle" transform="translate(118.318019, 74.818019) rotate(-45.000000) translate(-118.318019, -74.818019) " points="120.228388 70.8180195 122.318019 78.8180195 114.318019 76.7283885"></polygon>
                            </g>
                        </g>
                    </svg>
                </span>

                <DateType>{currentDate(props.time, props)}</DateType>
            </FlexWrapper>
        </DateWrapper>
    );
}

export default connect(mapStateToProps)(Clock);