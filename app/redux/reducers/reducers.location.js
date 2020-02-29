import {locationInitialState} from './initialStates';

export function currentLocation(state = locationInitialState, action) {
    switch (action.type) {
        case 'SET_DEVICE_LOCATION':
            return {latitude: action.latitude, longitude: action.longitude};
        case 'UNSET_DEVICE_LOCATION':
            return locationInitialState;
        default:
            return state;
    }
}
