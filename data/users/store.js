import { createStore } from 'redux'
import authProcess from './reducers'
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const pReducer = persistReducer(persistConfig, authProcess);

export const store = createStore(pReducer);
export const persistor = persistStore(store);
