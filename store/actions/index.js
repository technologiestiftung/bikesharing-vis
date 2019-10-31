import { SET_TIME } from '../constants/action-types';
import { SET_STATE_DECKGL } from '../constants/action-types';
import { SET_TIME_OFFSET } from '../constants/action-types';
import { SET_VIEWPORT } from '../constants/action-types';
import { SET_LOADED } from '../constants/action-types';
import { SET_DATA } from '../constants/action-types';
import { SET_HISTOGRAM } from '../constants/action-types';
import { SET_BUTTON_PLAY } from '../constants/action-types';
import { SET_BUTTON_PAUSE } from '../constants/action-types';
import { SET_BUTTON_FORWARD } from '../constants/action-types';
import { SET_BUTTON_BACKWARD } from '../constants/action-types';
import { SET_PROVIDER_0 } from '../constants/action-types';
import { SET_PROVIDER_1 } from '../constants/action-types';
import { SET_PROVIDER_2 } from '../constants/action-types';
import { SET_BAR_CURRENT } from '../constants/action-types';
import { TOGGLE_PROVIDER } from '../constants/action-types';
import { TOGGLE_UPDATE } from '../constants/action-types';
import { TOGGLE_OVERLAY_INFO } from '../constants/action-types';
import { SET_UPDATE_HISTOGRAM } from '../constants/action-types';
import { SET_STORY_ID } from '../constants/action-types';
import { SET_SBAHN_VISIBLE } from '../constants/action-types';
import { SET_ANIMATION_SPEED } from '../constants/action-types';
import { SET_TIME_EXTEND } from '../constants/action-types';
import { SET_DATASETS } from '../constants/action-types';
import { SET_SELECTED_DATASET } from '../constants/action-types';
import { SET_SELECTED_DATASET_INDEX } from '../constants/action-types';
import { SET_DISTRICTS_METADATA } from '../constants/action-types';
import { SET_DISTRICTS_DATA } from '../constants/action-types';
import { SET_BERLIN_GEOJSON } from '../constants/action-types';
import { SET_BERLIN_DISTRICTS_GEOJSON } from '../constants/action-types';
import { SET_HIGHLIGHTED_DISTRICT } from '../constants/action-types';
import { SET_MOUSE_DOWN } from '../constants/action-types';
import { SET_TEMPELHOF_GEOJSON } from '../constants/action-types';
import { SET_LINIENSTR_GEOJSON } from '../constants/action-types';
import { SET_NUM_RIDES } from '../constants/action-types';

export function setNumRides(payload) {
    return { 
        type: SET_NUM_RIDES, 
        payload 
    };
}

export function setLinienstrGeoJson(payload) {
    return { 
        type: SET_LINIENSTR_GEOJSON, 
        payload 
    };
}

export function setTempelhofGeoJson(payload) {
    return { 
        type: SET_TEMPELHOF_GEOJSON, 
        payload 
    };
}

export function setMouseDown(payload) {
    return { 
        type: SET_MOUSE_DOWN, 
        payload 
    };
}

export function setHighlightedDistrict(payload) {
    return { 
        type: SET_HIGHLIGHTED_DISTRICT, 
        payload 
    };
}

export function setBerlinDistrictsGeoJson(payload) {
    return { 
        type: SET_BERLIN_DISTRICTS_GEOJSON, 
        payload 
    };
}

export function setBerlinGeoJson(payload) {
    return { 
        type: SET_BERLIN_GEOJSON, 
        payload 
    };
}

export function setTimeExtend(payload) {
    return { 
        type: SET_TIME_EXTEND, 
        payload 
    };
}

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

export function setButtonForward(payload) {
    return { 
        type: SET_BUTTON_FORWARD, 
        payload 
    };
}

export function setButtonBackward(payload) {
    return { 
        type: SET_BUTTON_BACKWARD, 
        payload 
    };
}

export function setDistrictsMetadata(payload) {
    return { 
        type: SET_DISTRICTS_METADATA, 
        payload 
    };
}

export function setDistrictsData(payload) {
    return { 
        type: SET_DISTRICTS_DATA, 
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

export function toggleProvider(payload) {
    return { 
        type: TOGGLE_PROVIDER, 
        payload 
    };
}

export function toggleUpdate(payload) {
    return { 
        type: TOGGLE_UPDATE, 
        payload 
    };
}

export function toggleOverlayInfo(payload) {
    return { 
        type: TOGGLE_OVERLAY_INFO, 
        payload 
    };
}

export function setUpdateHistogram(payload) {
    return { 
        type: SET_UPDATE_HISTOGRAM, 
        payload 
    };
}

export function setStoryId(payload) {
    return { 
        type: SET_STORY_ID, 
        payload 
    };
}

export function setSbahnVisible(payload) {
    return { 
        type: SET_SBAHN_VISIBLE, 
        payload 
    };
}

export function setAnimationSpeed(payload) {
    return { 
        type: SET_ANIMATION_SPEED, 
        payload 
    };
}

export function setDatasets(payload) {
    return { 
        type: SET_DATASETS, 
        payload 
    };
}

export function setSelectedDataset(payload) {
    return { 
        type: SET_SELECTED_DATASET, 
        payload 
    };
}

export function setSelectedDatasetIndex(payload) {
    return { 
        type: SET_SELECTED_DATASET_INDEX, 
        payload 
    };
}
