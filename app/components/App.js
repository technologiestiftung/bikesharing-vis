import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import DeckGlWrapper from './DeckGL/index';
import Sidebar from './Sidebar/index';
import LogoSvg from './Logo/index';
import OverlayAbout from './OverlayAbout/index';
import { FlyToInterpolator } from 'react-map-gl';
import { connect } from "react-redux";
import { setDatasets,setBerlinGeoJson, setStateDeckGl, setNumRides, setTempelhofGeoJson, setLinienstrGeoJson, setBerlinDistrictsGeoJson, setSelectedDatasetIndex, setDistrictsMetadata, setDistrictsData, setSelectedDataset, setLoaded, setData, setProvider0, setProvider1, setTimeExtend, toggleUpdate, setViewport, setAnimationSpeed } from '../../store/actions/index';
import theme from '../../assets/theme';
import MetaTags from 'react-meta-tags';
import CSSTransition from 'react-transition-group/CSSTransitionGroup';
import {TRANSITION_EVENTS} from 'react-map-gl';

import { 
    json as d3Json,
    easeCubic as d3EaseCubic
} from 'd3';

import svg from '../../assets/citylab-logo.svg';

import LogoTSBSvg from '../components/LogoTSB/';

const TsbLinkDiv = styled.div`

    a {
        display: flex;
        font-family: ${props => props.theme.fontFamily};
        flex-direction: column;
        text-decoration: none;
        color: white;
        font-weight: bold;
    }
`;

const LogoImg = styled.img`
    margin-top: 10px;
    width: 150px;
    z-index: -1;
`;

const ByCityLab = styled.div`
    postition: absolute;
    bottom: 120px;
    font-family: 'IBM Plex Sans';
    color: white;
    font-size: 14px;
    left: 25px;
    position: absolute;

    @media screen and (max-width: 600px) {
        top: 110px;
        display: none;
    }
`;

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
      update: state.update,
      datasets: state.datasets,
      selectedDataset: state.selectedDataset,
      selectedDatasetIndex: state.selectedDatasetIndex,
      districtsData: state.districtsData,
      districtView: state.districtView,
    }
}

import '../../assets/stylesheet.scss';

class AppContainer extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            currentValue: null,
            currentDataset: null,
        }
    }  
    fetchData(vendorId) {

        let datasetsDay;
        let datasetsDistricts;

        d3Json(`./datasets.json`)
            .then((datasets) => {
                this.props.dispatch(setDatasets(datasets));
                let currentDataset = this.props.datasets[this.props.selectedDatasetIndex];
                this.props.dispatch(setSelectedDatasetIndex(this.props.selectedDatasetIndex));
                this.props.dispatch(setSelectedDataset(currentDataset[1]));
                
                this.setState({
                    currentDataset: this.props.selectedDataset
                });

                this.loadDataset(vendorId);
            })
    }

    updatePos = (view) => {
        view = view[0];

        const location = {
            longitude: view.longitude,
            latitude: view.latitude, 
            zoom: view.zoom,
            pitch: 45,
            transitionDuration: 2000,
            transitionInterpolator: new FlyToInterpolator(),
            transitionEasing: d3EaseCubic,
            onTransitionEnd: () => { this.props.dispatch(setStateDeckGl(true)); }
        }
        this.props.dispatch(setStateDeckGl(false));
        this.props.dispatch(setViewport(location));

    }

    loadDataset = (vendorId) => {
        let currentDataset = this.props.datasets[this.props.selectedDatasetIndex];
        
        this.props.dispatch(setSelectedDataset(currentDataset[1]));
        
        setTimeout(() => {

                    d3Json(`./data/${this.props.selectedDataset}`)
                    // d3Json('./data/data_routed_by_trips_new.json')
                    // uncomment for deployment
                        // d3Json(`/projects/bikesharing/data/${this.props.selectedDataset}`)
                        // count active trips in time and store in separate arrays for each provider
                        .then((data) => {
            
                            let timestampsArr0 = [];
                            let timestampsArr1 = [];
                            let timestampsArr2 = [];
            
                            data.forEach(trip => {
                                const firstTimestamp = trip.segments[0][2]
                                const lastTimestamp = trip.segments[trip.segments.length - 1][2]
            
                                if (trip.props.providerId == 0) {
                                    timestampsArr0.push([firstTimestamp, lastTimestamp]);
                                } else if (trip.props.providerId == 1) {
                                    timestampsArr1.push([firstTimestamp, lastTimestamp]);
                                } else if (trip.props.providerId == 2) {
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
                            // this.props.dispatch(setProvider2(tripsByTime2));
            
                            return data;
                        })
                        // filter data by provider
                        .then((data) => {
                            const selectedVendors = this.props.vendor.length;
            
                            let filtered;
            
                            let filteredLengthLidl = data.filter((d) => { return d.props.providerId == 1}).length;
                            let filteredLengthNext = data.filter((d) => { return d.props.providerId == 0}).length;

                            
                            this.props.dispatch(setNumRides({ next: filteredLengthNext, lidl: filteredLengthLidl }))

    
                            if(selectedVendors == 2) {
                                let filtered = data.filter((d) => { return d.props.providerId == vendorId[0] || d.props.providerId == vendorId[1]});
                                this.props.dispatch(setData(filtered));
                                this.props.dispatch(setLoaded(true));

                            } else if(selectedVendors == 1) {
                                let filtered = data.filter((d) => { return d.props.providerId == vendorId[0]});
                                this.props.dispatch(setData(filtered));
                            };
            
                            return filtered
                        })

                        .then((data) => {
                            let timestampsArr = [];
            
                            let first = 100000000000000, last = 0;
            
                            this.props.data.forEach(trip => {
                                first = Number(trip.props.timeStart) < first ? Number(trip.props.timeStart) : first;
                                last = Number(trip.props.timeEnd) > last ? Number(trip.props.timeEnd) : last;
            
                                const firstTimestamp = trip.segments[0][2]
                                const lastTimestamp = trip.segments[trip.segments.length - 1][2]
            
                                timestampsArr.push([firstTimestamp, lastTimestamp]);
                            })
            
                            this.props.dispatch(setTimeExtend([first, last]));
            
                            return timestampsArr;
                        })

                        .then(() => {
                            d3Json(`./data/${this.props.selectedDataset.replace('trails', 'districts')}`)
                            .then((districtsData => {
                                this.props.dispatch(setDistrictsMetadata(districtsData.allDistricts));
                                this.props.dispatch(setDistrictsData(districtsData));
                            }))
                        })
                        .then(() => {
                            d3Json(`./data/berlin.json`)
                            .then((data => {

                                this.props.dispatch(setBerlinGeoJson(data));

                                return data;

                                // this.props.dispatch(setBerlinDistrictsGeoJson());
                            })).then(data => {
                                const createDistrictJsons = (data) => {
                                    let arr = [];
                                    const dist = data.features.forEach(district => {
                                        let geojson = {
                                            type: "FeatureCollection",
                                            features: []
                                        }
                                        geojson.features = [];
                                        geojson.features.push(district);

                                        
                                        return arr.push(geojson);
                                    })
                            
                                    return arr;
                                }

                                const districts = createDistrictJsons(data);

                                this.props.dispatch(setBerlinDistrictsGeoJson(districts));
                            })
                        })
                        .then(() => {
                            d3Json('./data/tempelhof.json')
                            .then((data => {
                                this.props.dispatch(setTempelhofGeoJson(data));
                            }))
                        }) 
                        .then(() => {
                            d3Json('./data/linienstr.json')
                            .then((data => {
                                this.props.dispatch(setLinienstrGeoJson(data));
                            }))
                            this.props.dispatch(setStateDeckGl(true));
                        }) 
                                      
        }, 250)
        
        
    }

    filterData = (data) => {

    }

    TSBLink() {
        return <TsbLinkDiv className="link">
            <a href="https://citylab-berlin.org" target="_blank">
                <LogoImg src={svg}></LogoImg>
            </a>
        </TsbLinkDiv>;
    }

    componentDidMount() {
        this.fetchData(this.props.vendor);
        document.addEventListener('touchstart', event => event.preventDefault());
        document.addEventListener('contextmenu', event => event.preventDefault());
        this.props.dispatch(toggleUpdate(false));

        setTimeout(() => {
            document.querySelector('.mapboxgl-ctrl-bottom-left').remove();
        }, 250);
    }
    
    componentDidUpdate(prevProps) {

        if (prevProps.districtView != this.props.districtView) {
            if (this.props.districtView.length != 0) {
                this.updatePos(this.props.districtView);
            }
        }
        
        if (this.props.update == true) {
            this.loadDataset(this.props.vendor);
            this.props.dispatch(toggleUpdate(false));
        } else if (this.currentDataset != this.props.selectedDataset && this.props.update == true) {
            this.fetchData(this.props.vendor);
            this.props.dispatch(toggleUpdate(false));
        }

        if (prevProps.time > 99999) {
            let oldIndex = this.props.selectedDatasetIndex;
            const newIndex = this.props.selectedDatasetIndex == this.props.datasets.length - 1 ? 0 : oldIndex + 1;

            this.props.dispatch(setSelectedDatasetIndex(newIndex));
            this.props.dispatch(setSelectedDataset(this.props.datasets[this.props.selectedDatasetIndex][1]));
            this.fetchData(this.props.vendor);
        }

    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <div>
                    <MetaTags>
                        <title>Bike sharing flows</title>
                        <meta name="description" content="Berlins täglichen zeitlichen und räumlichen Mobilitätsströme der Bikesharing-Anbieter LIDL-Bike und Next-Bike visualisiert." />
                        <meta property="og:title" content="Bike sharing flows" />
                        <meta property="og:type" content="website" />
                        <meta property="og:image" content="https://fabiandinklage.com/projects/bikesharing/social_media.jpg" />
                        <meta property="article:author" content="Fabian Dinklage" />
                        <meta name="twitter:card" content="summary" />
                        <meta name="twitter:site" content="@TSBBerlin" />
                        <meta name="twitter:creator" content="@fdnklg" />
                        <meta name="twitter:url" content="https://fabiandinklage.com/projects/bikesharing/" />
                        <meta name="twitter:title" content="Bike sharing flows" />
                        <meta name="twitter:description" content="Berlins täglichen zeitlichen und räumlichen Mobilitätsströme der Bikesharing-Anbieter LIDL-Bike und Next-Bike visualisiert." />
                        <meta name="twitter:image" content="https://fabiandinklage.com/projects/bikesharing/social_media.jpg" />
                        <meta itemProp="name" content="Bike sharing flows" />
                        <meta itemProp="description" content="Berlins täglichen zeitlichen und räumlichen Mobilitätsströme der Bikesharing-Anbieter LIDL-Bike und Next-Bike visualisiert." />
                        <meta itemProp="image" content="https://fabiandinklage.com/projects/bikesharing/social_media.jpg" />
                    </MetaTags>
                    <div className="app-wrapper">
                        <DeckGlWrapper/>
                        <Sidebar data={this.props.districtsData}/>
                        <LogoSvg/>
                        <OverlayAbout/>
                    </div>
                    <ByCityLab>
                        <span>Ein Projekt von</span>
                        {this.TSBLink()}
                    </ByCityLab>
                    <LogoTSBSvg/>
                </div>
            </ThemeProvider>
            )
    }
}

export default connect(mapStateToProps)(AppContainer);