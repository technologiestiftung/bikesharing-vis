import React from 'react';
import DeckGlWrapper from './DeckGL/index';
import Analyse from './Analyse/index';
import Filter from './Filter/index';
import Overlay from './Overlay/index';
import ButtonInfo from './ButtonInfo/index';
import LogoSvg from './Logo/index';
import OverlayAbout from './OverlayAbout/index';
import { connect } from "react-redux";
import { setTime, setLoaded, setData, setHistogram, setProvider0, setProvider1, setProvider2, toggleUpdate } from '../../store/actions/index';
import store from '../../store/index';
import theme from '../../assets/theme';


import styled, { ThemeProvider } from 'styled-components';

import { json as d3Json } from 'd3';

const mapStateToProps = function(state) {
    return {
      time: state.time,
      data: state.data,
      vendor: state.vendor,
      histogram: state.histogram,
      provier0: state.provider0,
      provier1: state.provider1,
      provier2: state.provider2,
      loaded: state.loaded,
      update: state.update
    }
}

import '../../assets/stylesheet.scss';
import { updateEvents } from 'react-mapbox-gl/lib/map-events';

class AppContainer extends React.Component {
    
    constructor(props) {
		super(props);
    }
    
    fetchData(vendorId) {
        d3Json('./data/data_routed_by_trips_merged.json')
        // uncomment for deployment
        // d3Json('/projects/bikesharing/data/data_routed_by_trips_merged.json')
            // count active trips in time and store in separate arrays for each provider
            .then((data) => {

                let timestampsArr0 = [];
                let timestampsArr1 = [];
                let timestampsArr2 = [];

                data.forEach(trip => {
                    const firstTimestamp = trip.segments[0][2]
                    const lastTimestamp = trip.segments[trip.segments.length - 1][2]

                    if (trip.vendor == 0) {
                        timestampsArr0.push([firstTimestamp, lastTimestamp]);
                    } else if (trip.vendor == 1) {
                        timestampsArr1.push([firstTimestamp, lastTimestamp]);
                    } else if (trip.vendor == 2) {
                        timestampsArr2.push([firstTimestamp, lastTimestamp]);
                    }

                })

                let tripsByTime0 = [];
                let tripsByTime1 = [];
                let tripsByTime2 = [];


                for (let index = 0; index < 99999; index += 1000) {
                    let tripsCount = 0;
                    
                    timestampsArr0.forEach(timestamp => {
                        if (index > timestamp[0] && index < timestamp[1]) {
                            tripsCount += 1;
                        }
                    })
                    tripsByTime0.push([index, tripsCount]);
                }   

                for (let index = 0; index < 99999; index += 1000) {
                    let tripsCount = 0;
                    
                    timestampsArr1.forEach(timestamp => {
                        if (index > timestamp[0] && index < timestamp[1]) {
                            tripsCount += 1;
                        }
                    })
                    tripsByTime1.push([index, tripsCount]);
                }   

                for (let index = 0; index < 99999; index += 1000) {
                    let tripsCount = 0;
                    
                    timestampsArr2.forEach(timestamp => {
                        if (index > timestamp[0] && index < timestamp[1]) {
                            tripsCount += 1;
                        }
                    })
                    tripsByTime2.push([index, tripsCount]);
                }   

                this.props.dispatch(setProvider0(tripsByTime0));
                this.props.dispatch(setProvider1(tripsByTime1));
                this.props.dispatch(setProvider2(tripsByTime2));

                return data;
            })
            // filter data by provider
            .then((data) => {
                const selectedVendors = this.props.vendor.length;

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

                for (let index = 0; index < 99999; index += 1000) {
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

    filterData = (data) => {

    }

    componentDidMount() {
        this.fetchData(this.props.vendor);
    }
    
    componentDidUpdate() {
        if (this.props.update == true) {
            this.fetchData(this.props.vendor);
            this.props.dispatch(toggleUpdate(false));
        }
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <div className="app-wrapper">
                    <DeckGlWrapper/>
                    <Overlay/>
                    <ButtonInfo/>
                    <Analyse/>
                    <Filter/>
                    <LogoSvg/>
                    <OverlayAbout/>
                </div>
            </ThemeProvider>
            )
    }
}

export default connect(mapStateToProps)(AppContainer);