import React from 'react';
import { connect } from "react-redux";
import CameraHandleNew from '../CameraHandleNew/index.js';
import stories from '../../../assets/stories';

function mapStateToProps(state) {
    return {
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
            document.querySelector('.reset').classList.remove('visible');

        } else if ( node.previousSibling != null ) {
            node.previousSibling.classList.remove('active');
            node.classList.add('active');
            document.getElementById('districts-tab').classList.remove('active');
            document.getElementById('stories-tab').classList.add('active');
            document.querySelector('.reset').classList.add('visible');
        }
    }

    handleClickReset = (event) => {
        const node = event.target;

    }

    storiesDivs = () => {
        let divs = stories.map((story,i) => {
            return (
                <div class="story-outer">
                    <h3>{story.title}</h3>
                    <span>{story.description}</span>

                    <CameraHandleNew
                        label='Zum Standort'
                        lat={story.camera.lat} 
                        lng={story.camera.lng} 
                        zoom={story.camera.zoom} 
                        pitch={story.camera.pitch} 
                        bearing={story.camera.bearing} 
                        class={story.title}
                    ></CameraHandleNew>
                </div>
            )
        })
        return divs;
    }

    render() {
        return(
            <div className="tab tile">
                <div className="outer">
                    <div class="flex-wrapper row">
                        <span onClick={((e) => this.handleClick(e))} class="active">Bezirke</span>
                        <span onClick={((e) => this.handleClick(e))}>Geschichten</span>
                    </div>

                    <CameraHandleNew
                        label='Ansicht zurücksetzen'
                        lat={this.locationBerlin.lat} 
                        lng={this.locationBerlin.lng} 
                        zoom={this.locationBerlin.zoom} 
                        pitch={this.locationBerlin.pitch} 
                        bearing={this.locationBerlin.bearing} 
                        class={'reset'}
                    >
                    </CameraHandleNew>
                </div>

                <div id="districts-tab" className="numbers-wrapper active">
                    Districts
                </div>

                <div id="stories-tab" className="numbers-wrapper">
                    {this.storiesDivs()}
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Tab);