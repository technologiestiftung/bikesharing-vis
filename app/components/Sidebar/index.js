import React from 'react';
import { connect } from "react-redux";
import classNames from 'classnames';
import { setMode } from '../../../store/actions/index';

import Overview from '../Overview/index';
import Tab from '../Tab/index';
import Navigation from '../Navigation/index';
import LineChart from '../LineChart';
import HowTo from '../HowTo';


function mapStateToProps(state) {
    return {
        districtsMetadata: state.districtsMetadata,
        numRides: state.numRides,
        mode: state.mode
    };
}

class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.dataAllRides = null;
    }

    updateRidesData = () => {
        if (this.props.mode == 'departure') {
            this.dataAllRides = [this.props.districtsMetadata.arrStartLidl, this.props.districtsMetadata.arrStartNext]
        } else if (this.props.mode == 'arrival') {
            this.dataAllRides = [this.props.districtsMetadata.arrEndLidl, this.props.districtsMetadata.arrEndNext]
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.mode != this.props.mode) {
            this.updateRidesData();
        }
    }

    handleClick = (mode) => {
        this.props.dispatch(setMode(mode));
    }

    render() {
        // render district charts if data is available
        if (this.props.data != null && this.props.districtsMetadata != null) {

            this.updateRidesData();

            var btnModeClassArrival = classNames({
                'mode': true,
                'pressed': this.props.mode == 'arrival',
            });

            var btnModeClassDeparture = classNames({
                'mode': true,
                'pressed': this.props.mode == 'departure',
            });

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

                                <div className={'mode-wrapper'}>
                                    <span className={btnModeClassDeparture} onClick={(() => this.handleClick('departure'))}>Abfahrt</span>
                                    <span className={btnModeClassArrival} onClick={(() => this.handleClick('arrival'))}>Ankunft</span>
                                </div>
                            </div>

                            <div className="numbers-wrapper">
                                <LineChart 
                                    data={this.dataAllRides}
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