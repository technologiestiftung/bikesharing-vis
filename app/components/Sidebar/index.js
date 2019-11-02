import React from 'react';
import { connect } from "react-redux";
import classNames from 'classnames';
import { setMode, setDataAllRides} from '../../../store/actions/index';
import Swiper from 'react-id-swiper';

import Overview from '../Overview/index';
import SimpleSwiperWithParams from '../Swiper/index';
import Tab from '../Tab/index';
import HowTo from '../HowTo';
import Navigation from '../Navigation/index';
import LineChart from '../LineChart';

function mapStateToProps(state) {
    return {
        districtsMetadata: state.districtsMetadata,
        numRides: state.numRides,
        mode: state.mode,
        districtsData: state.districtsData,
        dataAllRides: state.dataAllRides
    };
}

class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.dataAllRides = null;

        this.state = {
            width: null,
            height: null
        }

        this.swiper = null;
    }

    updateRidesData = () => {
        if (this.props.mode == 'departure') {
            this.props.dispatch(setDataAllRides([this.props.districtsMetadata.arrStartLidl, this.props.districtsMetadata.arrStartNext]))
        } else if (this.props.mode == 'arrival') {
            this.props.dispatch(setDataAllRides([this.props.districtsMetadata.arrEndLidl, this.props.districtsMetadata.arrEndNext]))
        }
    }

    componentDidUpdate(prevProps) {
        if (this.state.width < 550) {
            setTimeout(() => { new Swiper('.container-swiper', { direction: 'horizontal', loop: true }); },250)
        }
        if (prevProps.districtsMetadata != this.props.districtsMetadata) {
            this.updateRidesData();
        }
        if (prevProps.mode != this.props.mode) {
            this.updateRidesData();
        }
    }

    updateDimensions = () => {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this));
        setTimeout(() => {
            this.updateDimensions();
            this.updateRidesData();
        },250)
    }

    handleClick = (mode) => {
        this.props.dispatch(setMode(mode));
    }

    render() {
        // render district charts if data is available
        if (this.props.data != null && this.props.districtsMetadata != null && this.state.width > 550 && this.props.dataAllRides != null) {

            var btnModeClassArrival = classNames({
                'mode': true,
                'pressed': this.props.mode == 'arrival',
            });

            var btnModeClassDeparture = classNames({
                'mode': true,
                'pressed': this.props.mode == 'departure',
            });

            console.log(this.props)

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
                                    data={this.props.dataAllRides}
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

        if (this.state.width < 550 && this.props.dataAllRides != null  && this.props.districtsData != null) {
            return (
                <SimpleSwiperWithParams></SimpleSwiperWithParams>
            )
        }

        return (
            <div></div>
        )
    }
}

export default connect(mapStateToProps)(Sidebar);