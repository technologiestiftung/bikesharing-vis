import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import classNames from 'classnames';
import { toggleProvider, setLoaded, toggleUpdate, setUpdateHistogram } from '../../../store/actions/index';

const ProviderWrapper = styled.span`
    border: 3px solid;
    font-family: ${props => props.theme.fontFamily};
    border-radius: 5px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: .25px;
    cursor: pointer;
    height: 20px;
    padding: 4px 8px 4px 8px;
    transition: all .25s ease;
    margin-left: 10px;

    &#lidlbike {
        color: rgba(239, 138,98,.5);
        width: 67px;
        background: rgba(239, 138,98,.1)
        transition: all .25s ease;

        &:hover {
            color: rgba(239, 138,98,.5);
            background: rgba(239, 138,98,.2);
        }

        &.btn-pressed {
            color: rgba(239, 138,98,1);
            background: rgba(239, 138,98,.3);
            transition: all .25s ease;
        }
    }
    &#nextbike {
        color: rgba(255,255,255,.5);
        background: rgba(255,255,255,.1)
        transition: all .25s ease;

        &:hover {
            color: rgba(255,255,255,.5);
            background: rgba(255,255,255,.2);
        }

        &.btn-pressed {
            color: rgba(255,255,255,1);
            background: rgba(255,255,255,.3);
            transition: all .25s ease;
        }
    }
`;

function mapStateToProps(state) {
    return {
      time: state.time,
      animate: state.animate,
      vendor: state.vendor,
      loaded: state.loaded,
      histogramNeedsUpdate: state.histogramNeedsUpdate
    };
}

class ProviderHandle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isHovered: false,
        }

        this.provider = [
            'nextbike',
            'lidlbike'
        ]
    }

    toggleProviders = () => {
        this.props.dispatch(setUpdateHistogram(true));
        let providerIncluded = this.props.vendor.includes(this.props.id);
        let providersArray = this.props.vendor;

        
        if (providerIncluded) {
            for ( var i = providersArray.length - 1; i >= 0; i-- ) {
                if( providersArray[i] === this.props.id && providersArray.length > 1 ) {
                    providersArray.splice(i, 1);
                    this.props.dispatch(toggleProvider(providersArray));
                    this.props.dispatch(toggleUpdate(true));
                }
            }
        } else {
            providersArray.push(this.props.id)
            this.props.dispatch(toggleProvider(providersArray));
            this.props.dispatch(toggleUpdate(true));
        }

    }

    containsProvider = () => {
        return this.props.vendor.includes(this.props.id)
    }

    render() {
        var btnClass = classNames({
            btn: true,
            'btn-pressed': this.containsProvider(),
            'btn-over': !this.props.buttonPlay && this.state.isHovered,
        });


        return (
            <ProviderWrapper
                className={btnClass}
                onClick={this.toggleProviders} 
                id={this.provider[this.props.id]}
            >
                {this.props.title}
            </ProviderWrapper>
        )
    }
}

export default connect(mapStateToProps)(ProviderHandle)