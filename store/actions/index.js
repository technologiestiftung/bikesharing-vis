import { SET_TIME } from '../constants/action-types';
import { SET_STATE_DECKGL } from '../constants/action-types';
import { SET_TIME_OFFSET } from '../constants/action-types';

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

