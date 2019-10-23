import React from 'react';
import { connect } from "react-redux";
import LineChart from '../LineChart';

function mapStateToProps(state) {
    return {
    };
}

class Overview extends React.Component {
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
                    <LineChart 
                        lidl={this.props.data.arrStartLidl} 
                        next={this.props.data.arrStartNext} 
                        id="tripsTotal" 
                        date={new Date('2019-12-17')}>    
                    </LineChart>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Overview);