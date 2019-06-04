import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import classNames from 'classnames';
import { toggleProvider, setLoaded, toggleUpdate } from '../../../store/actions/index';

const ProviderWrapper = styled.span`
    border: 1px solid;
    font-family: ${props => props.theme.fontFamily};
    color: ${props => props.theme.colorLight};
    border-radius: 6px;
    cursor: pointer;
    height: 20px;
    padding: 2px 6px 3px 6px;
    margin-right: 10px;
    transition: all .25s ease;

    &#lidlbike {
        color: ${props => props.theme.colorProvider0};
        transition: all .25s ease;

        &.btn-pressed {
            color: ${props => props.theme.colorPrimary};
            background: ${props => props.theme.colorProvider0};
            transition: all .25s ease;
        }
    }
    &#nextbike {
        color: ${props => props.theme.colorProvider1};
        transition: all .25s ease;

        &.btn-pressed {
            color: ${props => props.theme.colorPrimary};
            background: ${props => props.theme.colorProvider1};
            transition: all .25s ease;
        }
    }
    &#mobike {
        color: ${props => props.theme.colorProvider2};
        transition: all .25s ease;

        &.btn-pressed {
            color: ${props => props.theme.colorPrimary};
            background: ${props => props.theme.colorProvider2};
            transition: all .25s ease;
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