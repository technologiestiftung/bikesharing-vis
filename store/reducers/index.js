import districtViews from '../../assets/districtViews';

const initialState = {
    time: 0,
    animate: false,
    timeOffset: 0,
    data: null,
    loaded: false,
    update: false,
    buttonPlay: true,
    buttonPause: false,
    buttonForward: false,
    buttonBackward: false,
    vendor: [0,1],
    histogramNeedsUpdate: false,
    histogram: null,
    transitionDuration: 2500,
    viewport: {
        latitude: 52.50707714655106,
        longitude: 13.390768001568283,
        zoom: 12.586449081940776,
        pitch: 45,
        bearing: 0,
        maxZoom: 19,
        minZoom: 10,
    },
    storyId: null,
    provider0: 0,
    provider1: 0,
    mode: 'departure', // or 'arrival'
    provider2: 0,
    overlayInfo: true,
    barCurrent: null,
    sbahnVisible: false,
    animationSpeed: 30,
    berlinGeoJson: null,
    timeExtend: [],
    datasets: null,
    districtView: null,
    selectedDataset: null,
    selectedDatasetIndex: 18,
    districtsMetadata: null,
    districtsData: null,
    berlinDistrictsGeoJson: null,
    highlightedDistrict: null,
    mouseIsDown: false,
    tempelhofGeoJson: null,
    linienstrGeoJson: null,
    numRides: null,
    dataAllRides: null
}

function rootReducer(state = initialState, action) {

    if (action.type === 'SET_TIME') {
        // old fashioned way
        // return Object.assign({}, state, {
        //     time: action.payload
        // })

        // es6 way
        return {...state, time: action.payload}
    }

    if (action.type === 'SET_VIEW_TO_DISTRICT') {
        const pos = districtViews.filter(dist => { return dist.name == action.payload });
        return {...state, districtView: pos }
    }

    if (action.type === 'SET_MOUSE_DOWN') {
        return {...state, mouseIsDown: action.payload }
    }

    if (action.type === 'SET_DATA_ALL_RIDES') {
        return {...state, dataAllRides: action.payload }
    }

    if (action.type === 'SET_MODE') {
        return {...state, mode: action.payload }
    }

    if (action.type === 'SET_NUM_RIDES') {
        return {...state, numRides: action.payload }
    }

    if (action.type === 'SET_HIGHLIGHTED_DISTRICT') {
        return {...state, highlightedDistrict: action.payload }
    }

    if (action.type === 'SET_DISTRICTS_METADATA') {
        return {...state, districtsMetadata: action.payload }
    }

    if (action.type === 'SET_BERLIN_DISTRICTS_GEOJSON') {
        return {...state, berlinDistrictsGeoJson: action.payload }
    }

    if (action.type === 'SET_BERLIN_GEOJSON') {
        return {...state, berlinGeoJson: action.payload }
    }

    if (action.type === 'SET_TEMPELHOF_GEOJSON') {
        return {...state, tempelhofGeoJson: action.payload }
    }

    if (action.type === 'SET_LINIENSTR_GEOJSON') {
        return {...state, linienstrGeoJson: action.payload }
    }

    if (action.type === 'SET_DISTRICTS_DATA') {
        return {...state, districtsData: action.payload }
    }

    if (action.type === 'SET_TIME_EXTEND') {
        return {...state, timeExtend: action.payload }
    }

    if (action.type === 'SET_STATE_DECKGL') {
        return {...state, animate: action.payload }
    }

    if (action.type === 'SET_TIME_OFFSET') {
        return {...state, timeOffset: action.payload }
    }

    if (action.type === 'SET_VIEWPORT') {
        return {...state, viewport: action.payload }
    }    

    if (action.type === 'SET_LOADED') {
        return {...state, loaded: action.payload }
    }    

    if (action.type === 'SET_DATA') {
        return {...state, data: action.payload }
    }    

    if (action.type === 'SET_VENDOR') {
        return {...state, vendor: action.payload }
    }    

    if (action.type === 'SET_HISTOGRAM') {
        return {...state, histogram: action.payload }
    }

    if (action.type === 'SET_BUTTON_PLAY') {
        return {...state, buttonPlay: action.payload }
    }

    if (action.type === 'SET_BUTTON_FORWARD') {
        return {...state, buttonForward: action.payload }
    }

    if (action.type === 'SET_BUTTON_BACKWARD') {
        return {...state, buttonBackward: action.payload }
    }

    if (action.type === 'SET_BUTTON_PAUSE') {
        return {...state, buttonPause: action.payload }
    }

    if (action.type === 'SET_PROVIDER_0') {
        return {...state, provider0: action.payload }
    }

    if (action.type === 'SET_PROVIDER_1') {
        return {...state, provider1: action.payload }
    }

    if (action.type === 'SET_PROVIDER_2') {
        return {...state, provider2: action.payload }
    }

    if (action.type === 'SET_BAR_CURRENT') {
        return {...state, barCurrent: action.payload }
    }

    if (action.type === 'TOGGLE_PROVIDER') {
        return {...state, vendor: action.payload }
    }

    if (action.type === 'TOGGLE_UPDATE') {
        return {...state, update: action.payload }
    }

    if (action.type === 'TOGGLE_OVERLAY_INFO') {
        return {...state, overlayInfo: action.payload }
    }

    if (action.type === 'SET_UPDATE_HISTOGRAM') {
        return {...state, histogramNeedsUpdate: action.payload }
    }

    if (action.type === 'SET_STORY_ID') {
        return {...state, storyId: action.payload }
    }

    if (action.type === 'SET_SBAHN_VISIBLE') {
        return {...state, sbahnVisible: action.payload }
    }

    if (action.type === 'SET_ANIMATION_SPEED') {
        return {...state, animationSpeed: action.payload }
    }

    if (action.type === 'SET_DATASETS') {
        return {...state, datasets: action.payload }
    }

    if (action.type === 'SET_SELECTED_DATASET') {
        return {...state, selectedDataset: action.payload }
    }

    if (action.type === 'SET_SELECTED_DATASET_INDEX') {
        return {...state, selectedDatasetIndex: action.payload }
    }

    return state;
}

export default rootReducer;