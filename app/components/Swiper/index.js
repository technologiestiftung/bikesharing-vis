import Swiper from 'react-id-swiper';
import Overview from '../Overview/index';
import React, { useState, useEffect, useRef } from 'react'
import { connect, useDispatch } from 'react-redux'
import Navigation from '../Navigation/index';
import LineChart from '../LineChart';
import classNames from 'classnames';
import { setMode } from '../../../store/actions/index';
import Tab from '../Tab/index';
import HowTo from '../HowTo';

const SimpleSwiperWithParams = ({numRides, dataAllRides, mode, setModeNow}) => {
    const params = {
      spaceBetween: 0
    }

    var dispatch = useDispatch();

    var btnModeClassArrival = classNames({
        'mode': true,
        'pressed': mode == 'arrival',
    });

    var btnModeClassDeparture = classNames({
        'mode': true,
        'pressed': mode == 'departure',
    });

    var dispatchSetMode = (m) => {
        dispatch(setModeNow(m))
    }

    useEffect(() => {
        const elm = document.querySelector('.swiper-container-initialized');
        elm.classList.add('bottom');
    })
   
    return(
      <Swiper {...params}>
        <div>
            <div className="sidebar">
                <Navigation />
                <Overview lidl={numRides.lidl} next={numRides.next} all={numRides.lidl + numRides.next}/>
                <HowTo/>
            </div>
        </div>
        <div>
            <div className={'sidebar'}>
                <div className="tile">
                    <div className="outer">
                        <span>Alle Fahrten</span>

                        <div className={'mode-wrapper'}>
                            <span className={btnModeClassDeparture} onClick={(() => dispatchSetMode('departure'))}>Abfahrt</span>
                            <span className={btnModeClassArrival} onClick={(() => dispatchSetMode('arrival'))}>Ankunft</span>
                        </div>
                    </div>

                    <div className="numbers-wrapper">
                        <LineChart 
                            data={dataAllRides}
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
            </div>
        </div>
        <div>
            <div className={'sidebar'}>
                <Tab />
            </div>
        </div>
      </Swiper>
    )
}

const mapStateToProps = (state) => (
    {
        numRides: state.numRides,
        mode: state.mode,
        districtsMetadata: state.districtsMetadata,
        dataAllRides: state.dataAllRides
    }
)

const mapDispatchToProps = { 
    setModeNow: setMode
}

const SimpleSwiper = connect(mapStateToProps, mapDispatchToProps)(SimpleSwiperWithParams);

export default SimpleSwiper;
