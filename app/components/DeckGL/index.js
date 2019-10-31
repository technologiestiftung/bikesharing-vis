import React, {Component} from 'react';
import {StaticMap, FlyToInterpolator} from 'react-map-gl';
import DeckGL, {GeoJsonLayer, ArcLayer} from 'deck.gl';
import {PhongMaterial} from '@luma.gl/core';
import {AmbientLight, PointLight, LightingEffect} from '@deck.gl/core';

import { TripsLayer } from '@deck.gl/geo-layers';

import { config } from '../../../config.js';

import { connect } from "react-redux";
import { setTime, setTimeOffset } from '../../../store/actions/index';

function mapStateToProps(state) {
  return {
		time: state.time,
		animate: state.animate,
		timeOffset: state.timeOffset,
		viewport: state.viewport,
		loaded: state.loaded,
		berlinGeoJson: state.berlinGeoJson,
		linienstrGeoJson: state.linienstrGeoJson,
		tempelhofGeoJson: state.tempelhofGeoJson,
		storyId: state.storyId,
		tempelhofGeoJson: state.tempelhofGeoJson,
		berlinDistrictsGeoJson: state.berlinDistrictsGeoJson,
		highlightedDistrict: state.highlightedDistrict,
		data: state.data,
		sbahnVisible: state.sbahnVisible,
		animationSpeed: state.animationSpeed,
  };
}

// Set your mapbox token here
const MAPBOX_TOKEN = config.token; // eslint-disable-line

export const INITIAL_VIEW_STATE = {
  latitude: 52.500869,
  longitude: 13.419047,
	zoom: 16,
	maxZoom: 15,
  	minZoom: 13,
	pitch: 45,
	bearing: 0
	};
	
const material = new PhongMaterial({
		ambient: 0.1,
		diffuse: 0.6,
		shininess: 32,
		specularColor: [60, 64, 70]
});

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const pointLight = new PointLight({
  color: [255, 255, 255],
  intensity: 2.0,
  position: [-74.05, 40.7, 8000]
});

const paintLayer = {
	'fill-extrusion-color': '#aaa',
	'fill-extrusion-height': {
		type: 'identity',
		property: 'height'
	},
	'fill-extrusion-base': {
		type: 'identity',
		property: 'min_height'
	},
	'fill-extrusion-opacity': 0.6
};

const lightingEffect = new LightingEffect({ambientLight, pointLight});

class DeckGlWrapper extends React.Component {

	constructor(props) {
		super(props);

		this.sbahn = null;

		this.state = {
			timePause: null,
			timePlay: null,
			timeCurrent: null,
			timePrev: null,
			started: true,
			frame: 0
		}
	}

    _onViewportChange = viewport => {
        console.log('viewport')
    };

	_onClick(info) {
		if (info.object) {
			// eslint-disable-next-line
			alert(`${info.object.properties.name} (${info.object.properties.abbrev})`);
		}
	}

	_onload(evt) {
		
		
		const map = evt.target;
		const insertBefore = map.getStyle();

		const firstLabelLayerId = map.getStyle().layers.find(layer => layer.type === 'symbol').id;
		
		map.addLayer({
			'id': '3d-buildings',
			'source': 'composite',
			'source-layer': 'building',
			'filter': ['==', 'extrude', 'true'],
			'type': 'fill-extrusion',
			'minzoom': 0,
			'paint': {
			'fill-extrusion-color': '#FFF',			 
			'fill-extrusion-height': [
			"interpolate", ["linear"], ["zoom"],
			15, 0,
			15.05, ["get", "height"]
			],
			'fill-extrusion-base': [
				"interpolate", ["linear"], ["zoom"], 15, 0, 15.05, ["get", "min_height"]
			],
			'fill-extrusion-opacity': .3
			}
			}, firstLabelLayerId);
	}

	editViewport(val) {
		// console.log(val);
	}

	editTime(val) {
		this.props.dispatch(setTime(val));
	}

	editTimeOffset(val) {
		this.props.dispatch(setTimeOffset(val));
	}

	componentDidUpdate(prevProps) {
		if (prevProps.animate == false) {
			this.state.timePause = this.props.time;
			this.state.started = false;
		} 
		
		if (prevProps.animate == true && this.state.started == false) {
			this.state.timePlay = this.props.time;

			this.state.started = true;
		}

		if (this.props.animate !== prevProps.animate) {
			this._animate();
		}
	}

	_animate() {
		if (this.props.time > 99999) {
			this.editTime(0);
		} else if(this.props.time < 0) {
			this.editTime(99999);
		} else {
			this.editTime(this.props.time + this.props.animationSpeed);
		}


		if (this.props.animate == true) {
			this.state.timePrev = this.props.time;
			this._animationFrame = window.requestAnimationFrame(this._animate.bind(this));
		}
	}

	_renderLayers() {

		let layers = [];

		layers.push(
			new TripsLayer({
			id: 'trips-layer',
			data: this.props.data,
			getPath: d => d.segments.map(p => [p[0], p[1], p[2]]),
			getColor: (d) => {
				if(d.props.providerId == 0) {
					return [247,247,247]
				} 
				
				else if (d.props.providerId == 1) {
					return [239,138,98]
				}
			},
			opacity: 1,
			widthMinPixels: 5,
			rounded: true,
			trailLength: 1000,
			currentTime: this.props.time
					}),
		new GeoJsonLayer({
			id: "all-districts",
			data: this.props.berlinGeoJson,
			stroked: true,
			visible: true,
			filled: false,
			getLineColor: [130,130,130],
			getLineWidth: 10,
		}))

		if (this.props.berlinDistrictsGeoJson != null) {
			this.props.berlinDistrictsGeoJson.forEach((district,i) => {
				// console.log(district.features[0].properties.Gemeinde_name);
				if (this.props.highlightedDistrict == district.features[0].properties.Gemeinde_name) {
					layers.push(
						new GeoJsonLayer({
							id: district.features[0].properties.Gemeinde_name,
							data: district,
							stroked: true,
							visible: true,
							filled: false,
							getLineColor: [255,255,255],
							getLineWidth: 40,
						})
						)
					}
				})
			}
			
			if (this.props.linienstrGeoJson != null) {
				if (this.props.storyId == 0) {
					layers.push(
						new GeoJsonLayer({
							id: 'linienstr',
							data: this.props.linienstrGeoJson,
							stroked: true,
							visible: true,
							filled: false,
							getLineColor: [25,219,208],
							getLineWidth: 10,
						})
					)
				}
			}
			
			if (this.props.tempelhofGeoJson != null) {
				if (this.props.storyId == 1) {
					layers.push(
						new GeoJsonLayer({
							id: 'linienstr',
							data: this.props.tempelhofGeoJson,
							stroked: true,
							visible: true,
							filled: false,
							getLineColor: [25,219,208],
							getLineWidth: 10,
						})
					)
				}
			}



		return layers;
	}

	render() {
		const {viewState, controller = true, baseMap = true} = this.props;

		if(this.props.loaded) {
			return (
				<DeckGL 
					layers={this._renderLayers()}
					effects={[lightingEffect]}
					initialViewState={this.props.viewport} 
					viewState={this.props.viewport}
					controller={true}
					onViewStateChange={this.editViewport}
				>

				<StaticMap 
					mapboxApiAccessToken={MAPBOX_TOKEN} 
					mapStyle="mapbox://styles/mapbox/dark-v9" 
					transitionInterpolator={new FlyToInterpolator()}
					onViewportChange={this.editViewport}
					captureScroll={false}
					captureDrag={false}
					attributionControl={false}
					onLoad={this._onload.bind(this)
					}
				/>
				</DeckGL>
			);
		} else {
			
		}

		return (
			<DeckGL 
					// layers={this._renderLayers()}
					effects={[lightingEffect]}
					initialViewState={this.props.viewport} 
					viewState={this.props.viewport}
					controller={true}
			>
					<StaticMap 
						mapboxApiAccessToken={MAPBOX_TOKEN} 
						mapStyle="mapbox://styles/mapbox/dark-v9" 
						transitionInterpolator={new FlyToInterpolator()}
						captureScroll={false}
						attributionControl={false}
						captureDrag={false}
						onLoad={this._onload.bind(this)}
					/>
			</DeckGL>
		);

	}
}

export default connect(mapStateToProps)(DeckGlWrapper);