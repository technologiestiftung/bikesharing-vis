import React from 'react';
import { connect } from "react-redux";

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
                    <span>Fahrten pro Tag</span>
                </div>

                <div className="numbers-wrapper">
                    <div className="wrapper-number">
                        <span>LIDL-Bike</span>
                        <span className="number">{this.props.lidl != undefined ? this.props.lidl : 'lade...'}</span>
                    </div>

                    <div className="wrapper-number">
                        <span>NextBike</span>
                        <span className="number">{this.props.next != undefined ? this.props.next : 'lade...'}</span>
                    </div>

                    <div className="wrapper-number">
                        <span>Alle Fahrten</span>
                        <span className="number">{this.props.all != undefined ? this.props.all : 'lade...'}</span>
                    </div>

                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Overview);