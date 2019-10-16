import React from 'react';
import { connect } from "react-redux";
import {render} from 'react-dom';

import Clock from '../Clock/index';

import ProviderHandle from '../ProviderHandle/index.js';
import ButtonPlay from '../ButtonPlay/index.js';
import ButtonPause from '../ButtonPause/index.js';
import ButtonInfo from '../ButtonInfo/index.js';

function mapStateToProps(state) {
    return {
        districtsMetadata: state.districtsMetadata
    };
}


class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        // console.log(this.props);
    }

    componentDidMount() {
        // console.log(this.props);
    }

    render() {
        return(
            <div className="navigation">

                <div className="flex-wrapper">
                    <Clock/>
                </div>

                <div className="flex-wrapper mt-s">                    
                    <div className="flex-wrapper">
                        <ButtonPlay/>
                        <ButtonPause/>
                    </div>

                    <div className="flex-wrapper">
                        <ProviderHandle title="Nextbike" id={0}/>
                        <ProviderHandle title="LIDL-Bike" id={1}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Navigation);