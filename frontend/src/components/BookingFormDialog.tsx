import React from 'react'

import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button
} from '@material-ui/core'
import { BookingAttributesType } from '../types'
import BookingForm from './forms/Booking'

interface Props {
    bookingFormOpen: boolean
    handleCloseBookingForm: () => void
    selectedSlot: BookingAttributesType|null
}

const BookingFormDialog = ({ 
	bookingFormOpen, 
	handleCloseBookingForm,
	selectedSlot 
}: Props):React.ReactElement => {
	return (
		<Dialog open={bookingFormOpen} onClose={handleCloseBookingForm} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Make a booking</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{selectedSlot && `To book ${selectedSlot.service.name} on ${selectedSlot?.date?.toDateString()} at ${selectedSlot?.time}, add your email below.`}
				</DialogContentText>
				<BookingForm selectedSlot={selectedSlot} handleCloseBookingForm={handleCloseBookingForm} />
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCloseBookingForm} color="primary">
            Cancel
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default BookingFormDialog