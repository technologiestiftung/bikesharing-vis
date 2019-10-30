import React from 'react';
import { connect } from "react-redux";
import LineChart from '../LineChart';

function mapStateToProps(state) {
    return {
    };
}

class TileStory extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="tile">
                <div className="outer">
                    <span>{this.props.title}</span>
                </div>

                
                

                <div className="numbers-wrapper">
                    
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(TileStory);