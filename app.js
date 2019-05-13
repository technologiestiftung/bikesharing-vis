import React, {Component} from 'react';
import {render} from 'react-dom';
import {StaticMap} from 'react-map-gl';
import DeckGL, {GeoJsonLayer, ArcLayer} from 'deck.gl';

import { TripsLayer } from '@deck.gl/geo-layers';

import { config } from './config';

console.log();

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
	'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/trips/trips.json' // eslint-disable-line
};

export const INITIAL_VIEW_STATE = {
	longitude: -74,
	latitude: 40.72,
	zoom: 13,
	pitch: 45,
	bearing: 0
  };

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
		  animationSpeed = 30 // unit time per second
		} = this.props;
		const timestamp = Date.now() / 1000;
		const loopTime = loopLength / animationSpeed;
	
		this.setState({
			time: ((timestamp % loopTime) / loopTime) * loopLength
		});

		this._animationFrame = window.requestAnimationFrame(this._animate.bind(this));
	}

	render() {
		const layers = [
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
		// new ArcLayer({
		//   id: 'arcs',
		//   data: AIR_PORTS,
		//   dataTransform: d => d.features.filter(f => f.properties.scalerank < 4),
		//   // Styles
		//   getSourcePosition: f => [-0.4531566, 51.4709959], // London
		//   getTargetPosition: f => f.geometry.coordinates,
		//   getSourceColor: [0, 128, 200],
		//   getTargetColor: [200, 0, 80],
		//   getWidth: 1
		// }),

		// const {buildings = DATA_URL.BUILDINGS, trips = DATA_URL.TRIPS, trailLength = 180} = this.props;

		new TripsLayer({
			id: 'trips-layer',
			data: DATA_URL.TRIPS,
			// deduct start timestamp from each data point to avoid overflow
			getPath: d => d.segments,
			getColor: d => (d.vendor === 0 ? [253, 128, 93] : [23, 184, 190]),
			opacity: 0.8,
			widthMinPixels: 5,
			rounded: true,
			trailLength: 200,
			currentTime: this.state.time
		})
		];

		return (
		<DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers}>
			<StaticMap mapboxApiAccessToken={MAPBOX_TOKEN} mapStyle="mapbox://styles/mapbox/light-v9" />
		</DeckGL>
		);
	}
	}

	/* global document */
	render(<Root />, document.body.appendChild(document.createElement('div')));
