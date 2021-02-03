import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/user'

const rootReducer = combineReducers({
	userdata: userReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default function configureStore() {
	return createStore(rootReducer, {}, applyMiddleware(thunk))
}
