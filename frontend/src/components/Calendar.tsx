import React from 'react'
import { AppointmentPicker } from 'react-appointment-picker'

const Calendar = (): React.ReactElement => {

	const setToMonday = (date:Date):Date => {
		date.setHours(8)
		date.setMinutes(0)
		date.setSeconds(0)
		return date
	}
    
	const days = [
		[
			{ id: 1, number: 1, isSelected: true, periods: 1 },
			{ id: 2, number: 2 },
			{ id: 3, number: 3, isReserved: true },
			{ id: 4, number: 4 },
			{ id: 5, number: 5 },
			{ id: 6, number: 6 },
			{ id: 7, number: 7, isReserved: true, periods: 1 },
			{ id: 8, number: 8, isReserved: true },
			{ id: 9, number: 9, isReserved: true },
			{ id: 10, number: 10 },
			{ id: 11, number: 11 },
			{ id: 12, number: 12 }
		]
	]
    
 
	return (
		<div>
			<h1>Book</h1>
			<AppointmentPicker
				initialDay={setToMonday(new Date())}
				days={days}
				alpha
				visible
				local='fi-FI'
				unitTime={1800000}
				selectedByDefault
				loading={false}
			/>
		</div>
	)
}

export default Calendar