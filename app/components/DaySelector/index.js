import React, {Component} from 'react';
import {render} from 'react-dom';
import { connect } from "react-redux";
import { setTime, toggleUpdate, setDataset, setSelectedDataset, setTimeOffset, setViewport } from '../../../store/actions/index';

import { json as d3Json } from 'd3';

function mapStateToProps(state) {
  return {
        time: state.time,
        datasets: state.datasets
  };
}



class DaySelector extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
            selectValue: ''
		}
	}

    componentDidMount() {
        // d3Json('data/Sbahn-Ring.geojson')
        // 	.then(data => {
        // 		this._animate();
        // 		this.sbahn = data;
        // 	})
    }

	componentDidUpdate() {
    }
    
    handleChange = (e) => {
        this.setState({selectValue: e.target.value});
        this.props.dispatch(setSelectedDataset(e.target.value))
        this.props.dispatch(toggleUpdate(true));
    }


	render() {

        if (this.props.datasets != null) {

            return (
                <div>
                    <select
                        value={this.state.selectValue} 
                        onChange={this.handleChange}
                    >
                        {this.props.datasets.map((dataset) => <option key={dataset[0]} value={dataset[1]}>{dataset[0]}</option>)}
                    </select>
                </div>
            );
        } else {
            return '';
        }


	}
}

export default connect(mapStateToProps)(DaySelector);