import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/user'
import accountReducer from './reducers/account'
import bookingReducer from './reducers/bookings'

const rootReducer = combineReducers({
	userdata: userReducer,
	accountdata: accountReducer,
	bookingData: bookingReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default function configureStore() {
	return createStore(rootReducer, {}, applyMiddleware(thunk))
}
