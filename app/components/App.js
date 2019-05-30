import React from 'react';
import DeckGlWrapper from './DeckGL/index';
import Analyse from './Analyse/index';
import Filter from './Filter/index';
import LogoSvg from './Logo/index';
import { connect } from "react-redux";
import { setTime, setLoaded, setData, setHistogram } from '../../store/actions/index';
import store from '../../store/index';
import theme from '../../assets/theme';


import styled, { ThemeProvider } from 'styled-components';

import { json as d3Json } from 'd3';

const mapStateToProps = function(state) {
    return {
      time: state.time,
      data: state.data,
      vendor: state.vendor,
      histogram: state.histogram
    }
}

import '../../assets/stylesheet.scss';

class AppContainer extends React.Component {
    
    constructor(props) {
		super(props);
    }
    
    fetchData(vendorId) {
        d3Json('../../data/data_routed_by_trips_merged.json')
            .then((data) => {
                const selectedVendors = vendorId.length;

                let filtered;

                // filter data by bike vendor
                if (selectedVendors == 3) {
                    let filtered = data.filter((d) => { return d.vendor == vendorId[0] || d.vendor == vendorId[1] || d.vendor == vendorId[2]});
                    this.props.dispatch(setData(filtered));
                    this.props.dispatch(setLoaded(true));
                } else if(selectedVendors == 2) {
                    let filtered = data.filter((d) => { return d.vendor == vendorId[0] || d.vendor == vendorId[1]});
                    this.props.dispatch(setData(filtered));
                    this.props.dispatch(setLoaded(true));
                } else if(selectedVendors == 1) {
                    let filtered = data.filter((d) => { return d.vendor == vendorId[0]});
                    this.props.dispatch(setData(filtered));
                    this.props.dispatch(setLoaded(true));
                };

                return filtered
            }).then((data) => {
                // filter data by active bike trips at the moment

                // 2880 min = 2 days 
                // 288 * 10 min = 2 days
                // check every 347 steps how many trips are with in the timeslot

                let timestampsArr = [];

                this.props.data.forEach(trip => {
                    const firstTimestamp = trip.segments[0][2]
                    const lastTimestamp = trip.segments[trip.segments.length - 1][2]

                    timestampsArr.push([firstTimestamp, lastTimestamp]);
                })

                return timestampsArr;
            }).then(arr => {
                // count trips for every 10 minutes
                let tripsByTime = [];

                for (let index = 0; index < 99999; index += 347) {
                    let tripsCount = 0;
                    
                    arr.forEach(timestamp => {
                        if (index > timestamp[0] && index < timestamp[1]) {
                            tripsCount += 1;
                        }
                    })

                    tripsByTime.push([index, tripsCount]);
                }        
                
                return tripsByTime;
            }).then(histogramData => {
                this.props.dispatch(setHistogram(histogramData));
            })
    }

    componentDidMount() {
        this.fetchData(this.props.vendor);
    }

    componentDidUpdate() {
        
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <div className="app-wrapper">
                    <DeckGlWrapper/>
                    <Analyse/>
                    <Filter/>
                    <LogoSvg/>
                </div>
            </ThemeProvider>
            )
    }
}

export default connect(mapStateToProps)(AppContainer);