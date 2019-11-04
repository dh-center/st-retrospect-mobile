import { createStore } from 'redux'
import authProcess from './reducers'

export const store = createStore(authProcess);
