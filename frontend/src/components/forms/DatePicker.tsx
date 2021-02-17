import React from 'react'

import { DatePicker } from '@material-ui/pickers'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

import DateFnsUtils from '@date-io/date-fns'

import { connect } from 'react-redux'
import { AppState } from '../../store/types'

import { setSelectedDate } from '../../store/actions/bookings'

const mapStateToProps = (state: AppState) => ({
	selectedDate: state.bookingData.selectedDate,
})
  
type StateProps = ReturnType<typeof mapStateToProps>

interface DispatchProps { 
	setSelectedDate: (date: Date) => void
}

const DatePickerComponent = ({ selectedDate, setSelectedDate }: StateProps & DispatchProps):React.ReactElement => {

	const setDate = (formData: Date | null) => {
		setSelectedDate(formData ? formData : new Date())
	}

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils} >
			<DatePicker 
				value={selectedDate} 
				onChange={setDate} 
				variant="inline"
				inputVariant="standard"
				label="Date"
				autoOk={true}
			/>
		</MuiPickersUtilsProvider>
	)
}

export default connect(mapStateToProps, {
	setSelectedDate
})(DatePickerComponent)