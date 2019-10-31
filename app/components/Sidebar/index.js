import React from 'react';
import { connect } from "react-redux";
import {render} from 'react-dom';

import Overview from '../Overview/index';
import Tab from '../Tab/index';
import Navigation from '../Navigation/index';
import LineChart from '../LineChart';
import HowTo from '../HowTo';


function mapStateToProps(state) {
    return {
        districtsMetadata: state.districtsMetadata,
        numRides: state.numRides
    };
}

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // render district charts if data is available
        if (this.props.data != null && this.props.districtsMetadata != null) {
            return (
                <div className="sidebar">
                    <div className='wrapper-fixed'>
                        <Navigation />
                    </div>


                    <div className='wrapper-scroll'>
                        <Overview lidl={this.props.numRides.lidl} next={this.props.numRides.next} all={this.props.numRides.lidl + this.props.numRides.next}/>
                        <div className="tile">
                            <div className="outer">
                                <span>Alle Fahrten</span>
                            </div>

                            <div className="numbers-wrapper">
                                <LineChart 
                                    data={[this.props.districtsMetadata.arrStartLidl, this.props.districtsMetadata.arrStartNext]}
                                    id="tripsTotal" 
                                    date={new Date('2019-12-17')}
                                    legend={['LidlBike', 'NextBike']}
                                    domainY={150}
                                    yAxisLabel={'Alle Radfahrten / 30 Minuten'}
                                    marginLeft={30}
                                    >   
                                    
                                </LineChart>
                            </div>
                        </div>

                        <Tab />

                        <HowTo/>
                        

                    </div>

                </div>
            )
        }

        return (
            <div className="sidebar"></div>
        )
    }
}

export default connect(mapStateToProps)(Sidebar);