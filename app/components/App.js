import React from 'react';
import DeckGlWrapper from './DeckGL/index';
import Controls from './Controls/index';
import Analyse from './Analyse/index';
import { connect } from "react-redux";
import { setTime, setLoaded, setData } from '../../store/actions/index';
import store from '../../store/index';
import theme from '../../assets/theme';

import styled, { ThemeProvider } from 'styled-components';

import { json as d3Json } from 'd3';

const mapStateToProps = function(state) {
    return {
      time: state.time,
      data: state.data,
      vendor: state.vendor
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
                }

                return filtered
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
                    <Controls time={this.props.time}/>
                    <Analyse/>
                </div>
            </ThemeProvider>
            )
    }
}

export default connect(mapStateToProps)(AppContainer);