import React, {Component} from 'react';
import {render} from 'react-dom';
import {MapGL, StaticMap, FlyToInterpolator} from 'react-map-gl';
import DeckGL, {GeoJsonLayer, ArcLayer} from 'deck.gl';
import {PhongMaterial} from '@luma.gl/core';
import {AmbientLight, PointLight, LightingEffect} from '@deck.gl/core';

import { easeCubic as d3EaseCubic } from 'd3';

import { TripsLayer } from '@deck.gl/geo-layers';
import { PolygonLayer, Layer } from '@deck.gl/layers';

import { config } from '../../../config.js';

import { connect } from "react-redux";
import { setTime, setTimeOffset, setViewport } from '../../../store/actions/index';

function mapStateToProps(state) {
  return {
		time: state.time,
		animate: state.animate,
		timeOffset: state.timeOffset,
		viewport: state.viewport,
		loaded: state.loaded,
		data: state.data
  };
}

// Set your mapbox token here
const MAPBOX_TOKEN = config.token; // eslint-disable-line

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

// Source data CSV
const DATA_URL = {
  BUILDINGS:
	'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/trips/buildings.json', // eslint-disable-line
  TRIPS:
	'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/trips/trips.json', // eslint-disable-line
	TRIPS_TEST:
	'./data/data_routed_by_trips_merged.json'
};

export const INITIAL_VIEW_STATE = {
  latitude: 52.500869,
  longitude: 13.419047,
	zoom: 16,
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

		this.state = {
			timePause: null,
			timePlay: null,
			timeCurrent: null,
			timePrev: null,
			started: true,
			frame: 0
		}
	}

	_onClick(info) {
		if (info.object) {
			// eslint-disable-next-line
			alert(`${info.object.properties.name} (${info.object.properties.abbrev})`);
		}
	}

	_onload(map) {
		// const insertBefore = getFirstTextLayerId(map.getStyle());
		// map.addLayer(new RenderDeckLayerById({id: 'below-labels'}), insertBefore);
	
		// map.addLayer({
		// 	id:"3d-buildings",
		// 	sourceId:"composite",
		// 	sourceLayer:"building",
		// 	// filter: ['==', 'extrude', 'true'],
		// 	minZoom: 14,
		// 	'fill-extrusion-color': '#aaa',
		// 	'fill-extrusion-height': [ 'interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'height'] ], 'fill-extrusion-base': [ 'interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'min_height'] ],
		// 	'fill-extrusion-opacity': 1,
		// 	paint: paintLayer
		// })
	
		// Typically goes last
		// map.addLayer(new RenderRemainingDeckLayers());
	}

	editViewport(val) {
		this.props.dispatch(setViewport(val));
	}

	editTime(val) {
		this.props.dispatch(setTime(val));
	}

	editTimeOffset(val) {
		this.props.dispatch(setTimeOffset(val));
	}

	componentDidMount() {
		this._animate();
	}

	componentDidUpdate(prevProps) {

		if (prevProps.animate == false) {
			this.state.timePause = this.state.timeCurrent;
			this.state.started = false;
		} 
		
		if (prevProps.animate == true && this.state.started == false) {
			this.state.timePlay = this.state.timeCurrent;

			// check if offset becomes bigger than total length
			if (this.state.pause > this.state.play) {
				this.editTimeOffset(this.state.timePlay);
			} else {
				this.editTimeOffset(this.props.timeOffset + (this.state.timePlay - this.state.timePause));
			}

			this.state.started = true;
		}

		if (this.state.timePrev > this.props.time) {
			console.log(`prev: ${this.state.timePrev}, current: ${this.props.time}`)
			this.editTimeOffset(0);
		}

		if (this.props.animate !== prevProps.animate) {
			this._animate();
		}
	}

	_animate() {
		const {
		  loopLength = 99999, // unit corresponds to the timestamp in source data
		  animationSpeed = 1 // unit time per second
		} = this.props;

		this.state.frame+= 20 // Date.now() / 1000;
		const loopTime = loopLength / animationSpeed;

		this.state.timeCurrent = ((this.state.frame % loopTime) / loopTime) * loopLength

		this.editTime(this.state.timeCurrent - this.props.timeOffset);

		if (this.props.animate == true) {
			this.state.timePrev = this.props.time;
			this._animationFrame = window.requestAnimationFrame(this._animate.bind(this));
		}
	}

	_renderLayers() {
		return [
			new TripsLayer({
				id: 'trips-layer',
				data: this.props.data,
				// deduct start timestamp from each data point to avoid overflow
				getPath: d => d.segments.map(p => [p[0], p[1], p[2]]),
				getColor: (d) => {
					if(d.vendor === 0) {
						return [253, 128, 93]
					} else if (d.vendor === 1) {
						return [23, 184, 190]
					} else if (d.vendor === 2) {
						return [0, 0, 255]
					}
				},
				opacity: 0.8,
				widthMinPixels: 5,
				rounded: true,
				trailLength: 1000,
				currentTime: this.props.time
						}),
		]
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
						onViewportChange={this.editViewport}
				>
						<StaticMap 
							mapboxApiAccessToken={MAPBOX_TOKEN} 
							mapStyle="mapbox://styles/mapbox/dark-v9" 
							transitionInterpolator={new FlyToInterpolator()}
							onLoad={this._onload.bind(this)}
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
					onViewportChange={this.editViewport}
			>
					<StaticMap 
						mapboxApiAccessToken={MAPBOX_TOKEN} 
						mapStyle="mapbox://styles/mapbox/dark-v9" 
						transitionInterpolator={new FlyToInterpolator()}
						onLoad={this._onload.bind(this)}
					/>
			</DeckGL>
		);

	}
}

export default connect(mapStateToProps)(DeckGlWrapper);