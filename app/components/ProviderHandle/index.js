import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import classNames from 'classnames';
import { toggleProvider, setLoaded, toggleUpdate } from '../../../store/actions/index';

const ProviderWrapper = styled.span`
    border: 1px solid;
    font-family: ${props => props.theme.fontFamily};
    color: ${props => props.theme.colorLight};
    border-radius: 4px;
    cursor: pointer;
    padding: 2px 6px 3px 6px;

    &#lidlbike {
        color: ${props => props.theme.colorProvider0};

        &.btn-pressed {
            color: ${props => props.theme.colorPrimary};
            background: ${props => props.theme.colorProvider0};
        }
    }
    &#nextbike {
        color: ${props => props.theme.colorProvider1};

        &.btn-pressed {
            color: ${props => props.theme.colorPrimary};
            background: ${props => props.theme.colorProvider1};
        }
    }
    &#mobike {
        color: ${props => props.theme.colorProvider2};

        &.btn-pressed {
            color: ${props => props.theme.colorPrimary};
            background: ${props => props.theme.colorProvider2};
        }
    }
`;

function mapStateToProps(state) {
    return {
      time: state.time,
      animate: state.animate,
      vendor: state.vendor,
      loaded: state.loaded
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
            'lidlbike',
            'mobike'
        ]
    }

    toggleProviders = () => {
        let providerIncluded = this.props.vendor.includes(this.props.id);
        let providersArray = this.props.vendor;

        if (providerIncluded) {
            for ( var i = providersArray.length - 1; i >= 0; i-- ) {
                if( providersArray[i] === this.props.id ) {
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