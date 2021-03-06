import { Booking } from '../../types'
import { 
	BookingActionTypes,
} from '../types'
import '../reducers/bookings'

export function startAction():BookingActionTypes {
	return {
		type: '@prefix/START_BOOKING_ACTION'
	}
}

export function addBooking(booking:Booking):BookingActionTypes {
	return {
		type: '@prefix/ADD_BOOKING',
		payload: booking
	}
}

export function removeBooking(booking:Booking):BookingActionTypes {
	return {
		type: '@prefix/REMOVE_BOOKING',
		payload: booking
	}
}

export const setBookings = (bookings:Booking[]):BookingActionTypes =>  {
	return {
		type: '@prefix/SET_BOOKINGS',
		payload: bookings
	}
}

export const updateBookings = (bookings:Booking[]):BookingActionTypes =>  {
	return {
		type: '@prefix/UPDATE_BOOKINGS',
		payload: bookings
	}
}

export const resetBookings = ():BookingActionTypes =>  {
	return {
		type: '@prefix/RESET_BOOKINGS',
	}
}

export function setSelectedDate(date:Date):BookingActionTypes {
	return {
		type: '@prefix/SET_SELECTED_DATE',
		payload: date
	}
}

export function setFormVisibility():BookingActionTypes {
	return {
		type: '@prefix/SET_FORM_VISIBILITY',
	}
}


