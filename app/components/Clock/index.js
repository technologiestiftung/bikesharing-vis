import React from 'react';
import { connect } from "react-redux";
import { scaleLinear as d3ScaleLinear } from 'd3';
import { setSelectedDatasetIndex, setAnimationSpeed, setButtonBackward, setButtonForward, setButtonPause, setButtonPlay, setSelectedDataset, toggleUpdate } from '../../../store/actions/index';

import styled from 'styled-components';

const DateWrapper = styled.div`
    font-family: ${props => props.theme.fontFamily};
    color: ${props => props.theme.colorWhite};
`;

const TimeWrapper = styled.div`
    font-size: 14px;
    font-weight: 600;
`;

const FlexWrapper = styled.div`
    display: flex;
    flex-direction: row:
`;

const DateType = styled.div`
    font-size: 14px;
    color: white;
    font-weight: 600;
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
    1: 'Mo',
    2: 'Di',
    3: 'Mi',
    4: 'Do',
    5: 'Fr',
    6: 'Sa',
    0: 'So'
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
                props.dispatch(setButtonBackward(false));
                props.dispatch(setButtonPause(false));
                props.dispatch(setButtonPlay(true));
                props.dispatch(setButtonForward(false));
                props.dispatch(setAnimationSpeed(20));
            }
            
            if (cmd == 'previous') {
                let oldIndex = props.selectedDatasetIndex;
                const newIndex = props.selectedDatasetIndex == 0 ? datasetsLength : oldIndex - 1;
                props.dispatch(toggleUpdate(true));
                props.dispatch(setSelectedDatasetIndex(newIndex));
                props.dispatch(setSelectedDataset(props.datasets[props.selectedDatasetIndex][1]));
                props.dispatch(setButtonBackward(false));
                props.dispatch(setButtonPause(false));
                props.dispatch(setButtonPlay(true));
                props.dispatch(setButtonForward(false));
                props.dispatch(setAnimationSpeed(20));
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
                    <svg className="btn-prev" width="9px" height="14px" viewBox="0 0 9 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="cityslam_facebook_1920x1080" transform="translate(-956.000000, -533.000000)" stroke="#FFFFFF" strokeWidth="2.42857143">
                                <g id="Group" transform="translate(961.000000, 540.000000) rotate(-180.000000) translate(-961.000000, -540.000000) translate(958.000000, 534.000000)">
                                    <polyline id="Path-Copy-2" transform="translate(3.035714, 5.767857) rotate(90.000000) translate(-3.035714, -5.767857) " points="-2.42857143 8.5 2.91913557 3.03571429 8.5 8.5"></polyline>
                                </g>
                            </g>
                        </g>
                    </svg>
                </span>

                <span className="btn-next" onClick={() => handleClick('next', props) } >  
                    <svg width="9px" height="14px" viewBox="0 0 9 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="cityslam_facebook_1920x1080" transform="translate(-974.000000, -533.000000)" stroke="#FFFFFF" strokeWidth="2.42857143">
                                <g id="Group-Copy" transform="translate(975.000000, 534.000000)">
                                    <polyline id="Path-Copy-2" transform="translate(3.035714, 5.767857) rotate(90.000000) translate(-3.035714, -5.767857) " points="-2.42857143 8.5 2.91913557 3.03571429 8.5 8.5"></polyline>
                                </g>
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