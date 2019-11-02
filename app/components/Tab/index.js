import React from 'react';
import { connect } from "react-redux";
import CameraHandleNew from '../CameraHandleNew/index.js';
import LineChart from '../LineChart/index.js';
import stories from '../../../assets/stories';

function mapStateToProps(state) {
    return {
        districtsData: state.districtsData,
        mode: state.mode
    };
}

class Tab extends React.Component {
    constructor(props) {
        super(props);

        this.locationBerlin = {
            lat: 52.50707714655106,
            lng: 13.390768001568283,
            zoom: 12.586449081940776,
            pitch: 45,
            bearing: 0
        }

    }

    handleClick = (event) => {
        const node = event.target;

        if (node.nextSibling != null) {
            node.nextSibling.classList.remove('active');
            node.classList.add('active');
            document.getElementById('stories-tab').classList.remove('active');
            document.getElementById('districts-tab').classList.add('active');
            document.querySelector('.reset-view').click();

        } else if ( node.previousSibling != null ) {
            node.previousSibling.classList.remove('active');
            node.classList.add('active');
            document.getElementById('districts-tab').classList.remove('active');
            document.getElementById('stories-tab').classList.add('active');
        }
    }

    handleClickReset = (event) => {
        const node = event.target;
    }

    storiesDivs = () => {
        let divs = stories.map((story,i) => {
            return (
                <div className="story-outer" key={`key-${i}`}>
                    <h3>{story.title}</h3>
                    <span>{story.description}</span>

                    <CameraHandleNew
                        label='Standort'
                        lat={story.camera.lat} 
                        lng={story.camera.lng} 
                        zoom={story.camera.zoom} 
                        pitch={story.camera.pitch} 
                        bearing={story.camera.bearing} 
                        classNaming={story.title}
                        newStoryId={story.storyId}
                    ></CameraHandleNew>
                </div>
            )
        })
        return divs;
    }

    districtCharts = () => {

        const keys = Object.keys(this.props.districtsData);
            
        const charts = keys.map((districtName,i) => {
            if (districtName != 'allDistricts') {
                const districtData = this.props.districtsData[districtName];

                let modeLidl = this.props.mode == 'departure' ? 'arrStartLidl' : 'arrEndLidl';
                let modeNext = this.props.mode == 'departure' ? 'arrStartNext' : 'arrEndNext';

                return (
                    <LineChart 
                        data={[districtData[modeLidl], districtData[modeNext]]}
                        id={`tripsTotal-${i}`} 
                        date={new Date('2019-12-17')}
                        legend={['LidlBike', 'NextBike']}
                        domainY={60}
                        yAxisLabel={districtName}
                        marginLeft={25}
                        key={`key-${i}`} 
                    ></LineChart>
                )
            }
        })


        return charts;

    }

    render() {

        return(
            <div className="tab tile">
                <div className="outer">
                    <div className="flex-wrapper row">
                        <span onClick={((e) => this.handleClick(e))} className="active">Bezirke</span>
                        <span onClick={((e) => this.handleClick(e))}>Szenarien</span>
                    </div>

                    <CameraHandleNew
                        label='Ansicht zurücksetzen'
                        lat={this.locationBerlin.lat} 
                        lng={this.locationBerlin.lng} 
                        zoom={this.locationBerlin.zoom} 
                        pitch={this.locationBerlin.pitch} 
                        bearing={this.locationBerlin.bearing} 
                        classNaming={'reset-view'}
                        newStoryId={null}
                    >
                    </CameraHandleNew>
                </div>

                <div id="districts-tab" className="numbers-wrapper active">
                    {this.districtCharts()}
                </div>

                <div id="stories-tab" className="numbers-wrapper">
                    {this.storiesDivs()}
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Tab);