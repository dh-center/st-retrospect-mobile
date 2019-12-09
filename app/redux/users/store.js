import {createStore} from 'redux';
import appFlow from './reducers';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const pReducer = persistReducer(persistConfig, appFlow);

export const store = createStore(pReducer);
export const persistor = persistStore(store);
