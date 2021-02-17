import { 
	BookingActionTypes, 
	BookingState, 
} from '../types'

import { Booking } from '../../types'

const initialState = {
	bookings: [],
	updating: false,
	selectedDate: new Date(),
	bookingFormVisible: false
}

const mergeBookings = (oldBookings:Booking[], newBookings:Booking[]):Booking[] => {
	const combined = oldBookings.concat(newBookings)
	const bookingSet = new Set(combined)
	return Array.from(bookingSet)
} 

const bookingReducer = (state = initialState, action: BookingActionTypes):BookingState => {
	switch (action.type) {
	case '@prefix/START_ACTION':
		return {
			...state,
			updating: true
		}
	case '@prefix/ADD_BOOKING':
		return {
			...state,
			bookings: [action.payload, ...state.bookings],
			updating: false
		}
	case '@prefix/SET_BOOKINGS':
		return {
			...state,
			bookings: mergeBookings(state.bookings, action.payload),
			updating: false
		}
	case '@prefix/SET_SELECTED_DATE':
		return {
			...state,
			selectedDate: action.payload,
		}
	case '@prefix/SET_FORM_VISIBILITY':
		return {
			...state,
			bookingFormVisible: !state.bookingFormVisible,
		}
	default: 
		return state
	}
}

export default bookingReducer