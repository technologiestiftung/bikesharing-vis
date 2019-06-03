import { SET_TIME } from '../constants/action-types';
import { SET_STATE_DECKGL } from '../constants/action-types';
import { SET_TIME_OFFSET } from '../constants/action-types';
import { SET_VIEWPORT } from '../constants/action-types';
import { SET_LOADED } from '../constants/action-types';
import { SET_DATA } from '../constants/action-types';
import { SET_HISTOGRAM } from '../constants/action-types';
import { SET_BUTTON_PLAY } from '../constants/action-types';
import { SET_BUTTON_PAUSE } from '../constants/action-types';
import { SET_PROVIDER_0 } from '../constants/action-types';
import { SET_PROVIDER_1 } from '../constants/action-types';
import { SET_PROVIDER_2 } from '../constants/action-types';
import { SET_BAR_CURRENT } from '../constants/action-types';

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

export function setHistogram(payload) {
    return { 
        type: SET_HISTOGRAM, 
        payload 
    };
}

export function setButtonPlay(payload) {
    return { 
        type: SET_BUTTON_PLAY, 
        payload 
    };
}

export function setButtonPause(payload) {
    return { 
        type: SET_BUTTON_PAUSE, 
        payload 
    };
}

export function setProvider0(payload) {
    return { 
        type: SET_PROVIDER_0, 
        payload 
    };
}

export function setProvider1(payload) {
    return { 
        type: SET_PROVIDER_1, 
        payload 
    };
}

export function setProvider2(payload) {
    return { 
        type: SET_PROVIDER_2, 
        payload 
    };
}

export function setBarCurrent(payload) {
    return { 
        type: SET_BAR_CURRENT, 
        payload 
    };
}
