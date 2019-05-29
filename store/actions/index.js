import { SET_TIME } from '../constants/action-types';
import { SET_STATE_DECKGL } from '../constants/action-types';
import { SET_TIME_OFFSET } from '../constants/action-types';
import { SET_VIEWPORT } from '../constants/action-types';
import { SET_LOADED } from '../constants/action-types';
import { SET_DATA } from '../constants/action-types';

export function setTime(payload) {
    return { 
        type: SET_TIME, 
        payload 
    };
}

export function setStateDeckGl(payload) {
    return { 
        type: SET_STATE_DECKGL, 
        payload 
    };
}

export function setTimeOffset(payload) {
    return { 
        type: SET_TIME_OFFSET, 
        payload 
    };
}

export function setViewport(payload) {
    return { 
        type: SET_VIEWPORT, 
        payload 
    };
}

export function setLoaded(payload) {
    return { 
        type: SET_LOADED, 
        payload 
    };
}

export function setData(payload) {
    return { 
        type: SET_DATA, 
        payload 
    };
}

export function setVendor(payload) {
    return { 
        type: SET_VENDOR, 
        payload 
    };
}

