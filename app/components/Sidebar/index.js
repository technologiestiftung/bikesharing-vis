import React from 'react';
import { connect } from "react-redux";
import {render} from 'react-dom';
import styled from 'styled-components';

import DistrictsChart from '../DistrictsChart/index';
import Overview from '../Overview/index';
import Navigation from '../Navigation/index';

function mapStateToProps(state) {
    return {
        districtsMetadata: state.districtsMetadata
    };
}

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        // console.log(this.props);
    }

    componentDidMount() {
        // console.log(this.props);
    }

    render() {

        console.log(this.props);



        // render district charts if data is available
        if (this.props.data != null && this.props.districtsMetadata != null) {

            const keys = Object.keys(this.props.data);

            console.log(this.props.districtsMetadata);
            
            const districtData = keys.map((districtName,i) => {
                if (districtName != 'summary') {
                    const districtData = this.props.data[districtName];
                    // return (<DistrictsChart type="start" max={this.props.districtsMetadata.maxTripsStart} data={districtData} name={districtName} key={i} id={`district-${i}`} />)
                }
            })

            return (
                <div className="sidebar">
                    <Navigation />
                    <Overview data={this.props.districtsMetadata}/>
                    {districtData}
                </div>
            )
        }

        return (
            <div className="sidebar"></div>
        )
    }
}

export default connect(mapStateToProps)(Sidebar);