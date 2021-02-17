import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { useQuery } from 'react-query'
import { 
	getAccountById,
	getBookingsByAccountIdAndDateStr
} from '../services/queries'

import { 
	useParams, 
} from 'react-router-dom'

import { 
	setAccounts, 
} from '../store/actions/accounts'

import { 
	setBookings, 
	addBooking 
} from '../store/actions/bookings'

import { AppState } from '../store/types'

import { Account, Service, BookingAttributesType, Booking } from '../types'

import {
	Container,
	createStyles,
	makeStyles,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button
} from '@material-ui/core'

import DatePicker from './forms/DatePicker'
import BookingForm from './forms/Booking'

import { dateString } from '../utils/helpers'

const stylesInUse = makeStyles(() =>
	createStyles({
		root: {
			background: '#eee',
			position: 'relative',
			justifyContent: 'center',
			alignItems: 'center',

		},
		gridContainer: {
			display: 'flex',
			width: '100%',
			flexDirection: 'row',
		},
		gridItem: {
			minWidth: '200px',
			maxWidth: '50%',
			width: '100%',
			flex: 'auto',
			margin: '5px'
		},
		gridContent: {
			display: 'flex',
			flexDirection: 'column'
		},
		header: {
			background: '#6A0572',
			justifyContent: 'center',
			alignItems: 'center',
			paddingTop: '20px',
			paddingBottom: '30px',
			color:'#ffffff'
		},
		content: {

		},
		heading_1: {
			fontSize: '3rem',
			position: 'relative',
			fontWeight: 'bold',
			letterSpacing: -1,
			margin: '1rem 0 0.5rem 0',
		},
		heading_2: {
			fontSize: '1.2rem',
			fontWeight: 'bold',
			marginBottom: '1rem',
			textAlign: 'center'
		},
		slot: {
			background: '#fff',
			display: 'flex',
			padding: '15px',
			alignItems: 'center',
			justifyContent: 'center',
			margin: '2px',
			cursor: 'pointer',
			'&:hover': {
				background: '#f7f7f7'
			}
		},
		slotReserved: {
			background: '#e2e2e2',
			color: '#666',
			display: 'flex',
			padding: '15px',
			alignItems: 'center',
			justifyContent: 'center',
			margin: '2px',
		},
		selectedSlot: {
			background: '#5BC8AF',
			display: 'flex',
			padding: '15px',
			alignItems: 'center',
			justifyContent: 'center',
			margin: '2px',
			cursor: 'pointer',
		},
		containedBtn: {
			backgroundColor: '#6A0572',
			padding: '12px 20px',
			fontWeight: 'bold',
			color: '#ffffff',
			margin: '0 0.5em',
			width: 'auto',
		},
		row: {
			padding: '15px 0',
			background: '#ddd'
		}
	})
)


interface RouteParams {
	accountId: string|undefined
}

const mapStateToProps = (state: AppState) => ({
	accountdata: state.accountdata,
	bookingData: state.bookingData
})
  
type Props = ReturnType<typeof mapStateToProps>

interface DispatchProps { 
    setAccounts: (accounts:Account[]) => void
	setBookings: (bookings: Booking[]) => void
}

const Calendar = ({ 
	accountdata, 
	bookingData,
	setAccounts, 
	setBookings
}: Props & DispatchProps):React.ReactElement => {

	const [bookingFormOpen, setbookingFormOpen] = useState(false)
	const [selectedSlot, setSelectedSlot] = useState<BookingAttributesType|null>(null)

	const handleSelectDate = (slot:BookingAttributesType) => {
		setSelectedSlot(slot)
		setbookingFormOpen(true)
	}

	const handleCloseBookingForm = () => {
		setSelectedSlot(null)
		setbookingFormOpen(false)
	}

	const { accountId } = useParams<RouteParams>()
	const account = (accountdata && accountId) && accountdata.accounts.find(acc => acc.id === parseInt(accountId)) 

	const classes = stylesInUse()

	const queryAccount = useQuery(['getAccountById', accountId], () => getAccountById(accountId), { 
		enabled: !account
	})

	const queryAccountBookings = useQuery(
		['getBookingsByAccountIdAndDateStr', 
			{ accountId, date: dateString(bookingData.selectedDate) }], 
		() => getBookingsByAccountIdAndDateStr({ accountId, date: dateString(bookingData.selectedDate) }), { 
			enabled: !!accountId
		})

	console.log('bookingData', bookingData)

	useEffect(() => {
		if (
			!account &&
			queryAccount.isSuccess && 
            queryAccount.data.data
		) {
			setAccounts([queryAccount.data.data])
		}

		if (
			account &&
			queryAccountBookings.isSuccess && 
            queryAccountBookings.data.data
		) {
			setBookings(queryAccountBookings.data.data)
		}

	}, [queryAccount, queryAccountBookings, account])

	const timeToSeconds = (timeStr:string):number => {
		const timeStrArr = timeStr.split(':')
		return parseInt(timeStrArr[0]) * 60 * 60 + parseInt(timeStrArr[1]) * 60
	}

	const timeSlotCount = (service:Service):number => {
		const startTimeInSeconds = timeToSeconds(service.startTime)
		const endTimeInSeconds = timeToSeconds(service.endTime)
		const timeSlotLenInSeconds = service.timeSlotLen * 60
		return (endTimeInSeconds - startTimeInSeconds) / timeSlotLenInSeconds
	}

	const makeServiceTimeSlots = (service:Service):BookingAttributesType[] => {
		const timeUnits = timeSlotCount(service)
		const res = []
		for (let i = 0; i < timeUnits; i++) {
			const timeStrParts = service.startTime.split(':')
			const increment = service.timeSlotLen * i  
			const hours = `${Math.floor(parseInt(timeStrParts[0]) + increment/60)}`
			const mins = `${increment % 60}`
			const time = `${hours.length === 1 ? 0 : ''}${hours}:${mins}${mins.length === 1 ? 0 : ''}` 
	
			const reservations = bookingData.bookings.length > 0 
				? bookingData.bookings.filter(booking => 
					booking.slotNumber === i && 
					booking.service_id === service.id &&
					dateString(bookingData.selectedDate) === booking.date) : []
			const isReserved = reservations.length >= service.maxBookings

			res.push({
				id: i,
				slotNumber: i,
				isReserved,
				time,
				service: service,
				date: bookingData.selectedDate
			})
		}
		return res
	}

	const services = account ? account.services : []
 
	return (
		<div className={classes.root}>
			<div className={classes.header}>
				<Container maxWidth="xl">
					<h1 className={classes.heading_1}>{account ? `Booking calendar for ${account.name}` : 'Booking calendar'}</h1>
				</Container>
			</div>
			
			<div className={classes.row}>
				<Container maxWidth="xl">
					<DatePicker />
				</Container>
			</div>

			<div className={classes.content}>
				<Container maxWidth="xl">
					
					<div className={classes.gridContainer}>
						{services.map((service) => {
							const slots = makeServiceTimeSlots(service)
							return (
								<div key={service.id} className={classes.gridItem}>
									<h2 className={classes.heading_2}>{service.name}</h2>
									<div className={classes.gridContent}>
										{slots.map(slot => {
											if (!slot) {
												return
											}
											if (slot.isReserved) {
												return (
													<div 
														key={`${service.id}-${slot.id}`} 
														className={classes.slotReserved}>
														<div>
															{slot.time}
														</div>
													</div>
												)
											}
											return (
												<div 
													key={`${service.id}-${slot.id}`} 
													className={selectedSlot && selectedSlot.id === slot.id && selectedSlot.service.id === slot.service.id ? classes.selectedSlot : classes.slot}
													onClick={() => handleSelectDate(slot)}
												>
													<div>
														{slot.time} 
													</div>
												</div>
											)
										})}
									</div>
									
								</div>
							)
						})}
					</div>
				</Container>
			</div>
			
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
			
		</div>
	)
}

export default connect(mapStateToProps, {
	setAccounts,
	setBookings
})(Calendar)