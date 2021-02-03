import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/user'
import accountReducer from './reducers/account'

const rootReducer = combineReducers({
	userdata: userReducer,
	accountdata: accountReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default function configureStore() {
	return createStore(rootReducer, {}, applyMiddleware(thunk))
}
