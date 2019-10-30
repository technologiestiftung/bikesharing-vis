import React from 'react';
import { connect } from "react-redux";
import {render} from 'react-dom';
import styled from 'styled-components';


import Overview from '../Overview/index';
import Tile from '../Tile/index';
import Tab from '../Tab/index';
import Navigation from '../Navigation/index';
import LineChart from '../LineChart';


function mapStateToProps(state) {
    return {
        districtsMetadata: state.districtsMetadata
    };
}

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // console.log(this.props);
    }

    render() {
        // render district charts if data is available
        if (this.props.data != null && this.props.districtsMetadata != null) {

            const keys = Object.keys(this.props.data);
            
            const districtData = keys.map((districtName,i) => {
                if (districtName != 'summary') {
                    const districtData = this.props.data[districtName];
                    // return (<Tile type="start" data={districtData} title={districtName} key={i} id={`district-${i}`} />)
                    return (
                        <LineChart 
                            lidl={districtData.arrStartLidl} 
                            next={districtData.arrStartNext} 
                            data={[districtData.arrStartLidl, districtData.arrStartNext]}
                            id="tripsTotal" 
                            date={new Date('2019-12-17')}
                            legend={['LidlBike', 'NextBike']}
                        >   
                         
                        </LineChart>
                    )
                }
            })

            console.log(districtData);

            return (
                <div className="sidebar">
                    <Navigation />
                    <Overview data={this.props.districtsMetadata}/>
                    <Tab />
                    <Tile title="Übersicht" data={this.props.districtsMetadata}></Tile>
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