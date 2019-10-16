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
                    <span>Übersicht</span>
                </div>

                <div className="numbers-wrapper">
                    <div className="wrapper-number">
                        <span>ø-Distanz (km)</span>
                        <span className="number">data here</span>
                    </div>

                    <div className="wrapper-number">
                        <span>ø-Geschw. (km/h)</span>
                        <span className="number">data here</span>
                    </div>

                    <div className="wrapper-number">
                        <span>Alle Fahrten</span>
                        <span className="number">{this.props.data.tripsTotal}</span>
                    </div>

                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Overview);