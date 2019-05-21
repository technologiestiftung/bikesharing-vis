import React, {Component} from 'react';
import {render} from 'react-dom';
import {StaticMap} from 'react-map-gl';
import DeckGL, {GeoJsonLayer, ArcLayer} from 'deck.gl';
import {PhongMaterial} from '@luma.gl/core';
import {AmbientLight, PointLight, LightingEffect} from '@deck.gl/core';

import { TripsLayer } from '@deck.gl/geo-layers';
import { PolygonLayer } from '@deck.gl/layers';

import { config } from './config';

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
	'./data_routed_by_trips_merged.json'
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


const lightingEffect = new LightingEffect({ambientLight, pointLight});

class Root extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  time: 0
		};
	  }

	_onClick(info) {
		if (info.object) {
			// eslint-disable-next-line
			alert(`${info.object.properties.name} (${info.object.properties.abbrev})`);
		}
	}

	componentDidMount() {
		this._animate();
	}

	_animate() {
		const {
		  loopLength = 1800, // unit corresponds to the timestamp in source data
		  animationSpeed = 120 // unit time per second
		} = this.props;
		const timestamp = Date.now() / 1000;
		const loopTime = loopLength / animationSpeed;
	
		this.setState({
			time: ((timestamp % loopTime) / loopTime) * loopLength
		});

		this._animationFrame = window.requestAnimationFrame(this._animate.bind(this));
	}

	_renderLayers() {
		return [
			new GeoJsonLayer({
				id: 'airports',
				// data: AIR_PORTS,
				// Styles
				filled: true,
				pointRadiusMinPixels: 2,
				opacity: 1,
				pointRadiusScale: 2000,
				// getRadius: f => 11 - f.properties.scalerank,
				getFillColor: [200, 0, 80, 180],
				// Interactive props
				pickable: true,
				autoHighlight: true,
				onClick: this._onClick
			}),
			new TripsLayer({
				id: 'trips-layer',
				data: DATA_URL.TRIPS_TEST,
				// deduct start timestamp from each data point to avoid overflow
				getPath: d => d.segments.map(p => [p[0], p[1], p[2] - 90820]),
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
				currentTime: this.state.time
			}),
			// new PolygonLayer({
			// 	id: 'buildings',
			// 	data: DATA_URL.BUILDING,
			// 	extruded: true,
			// 	wireframe: false,
			// 	opacity: 1,
			// 	getPolygon: f => f.polygon,
			// 	getElevation: f => f.height,
			// 	getFillColor: [74, 80, 87],
			// 	material
			// }),
		]
	}

	render() {
		const {viewState, controller = true, baseMap = true} = this.props;

		return (
		<DeckGL 
			layers={this._renderLayers()}
			effects={[lightingEffect]}
			initialViewState={INITIAL_VIEW_STATE} 
			controller={true}
		>
			<StaticMap mapboxApiAccessToken={MAPBOX_TOKEN} 
			mapStyle="mapbox://styles/mapbox/light-v9" />
		</DeckGL>
		);
	}
	}

	/* global document */
	render(<Root />, document.body.appendChild(document.createElement('div')));
