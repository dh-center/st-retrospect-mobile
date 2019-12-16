import {localeInitialState} from './initialStates';

export function locale(state = localeInitialState, action) {
    switch (action.type) {
        case 'SET_LOCALE':
            return action.locale;
        default:
            return state;
    }
}
