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
} from '../store/actions/bookings'

import { AppState } from '../store/types'

import { Account, Service, BookingAttributesType, Booking } from '../types'

import {
	Container,
	createStyles,
	makeStyles,
} from '@material-ui/core'

import { Info as InfoIcon } from '@material-ui/icons'

import DatePicker from './forms/DatePicker'
import TimeSlotList from './TimeSlotList'
import BookingFormDialog from './BookingFormDialog'
import ServiceInfoDialog from './ServiceInfoDialog'

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
		},
		infoIcon: {
			margin: '0 4px 0',
			position: 'relative',
			top: '2px',
			cursor: 'pointer'
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

	const [bookingFormOpen, setbookingFormOpen] = useState<boolean>(false)
	const [infoFormOpen, setInfoFormOpen] = useState<boolean>(false)
	const [selectedService, setSelectedService] = useState<Service|null>(null)
	const [selectedSlot, setSelectedSlot] = useState<BookingAttributesType|null>(null)
	const now = new Date()

	const handleSelectDate = (slot:BookingAttributesType) => {
		setSelectedSlot(slot)
		setbookingFormOpen(true)
	}

	const handleCloseBookingForm = () => {
		setSelectedSlot(null)
		setbookingFormOpen(false)
	}

	const handleToggleInfoForm = (service:Service|null) => {
		setSelectedService(service)
		setInfoFormOpen(!infoFormOpen)
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

			const selectedTime = new Date(bookingData.selectedDate)
			selectedTime.setHours(parseInt(hours))
			selectedTime.setMinutes(parseInt(mins))

			const reservations = bookingData.bookings.length > 0 
				? bookingData.bookings.filter(booking => 
					booking.slotNumber === i && 
					booking.service_id === service.id &&
					dateString(bookingData.selectedDate) === booking.date) : []
			const isReserved =  selectedTime < now || reservations.length >= service.maxBookings 

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
									<h2 className={classes.heading_2}>
										{service.name}
										<InfoIcon 
											onClick={() => handleToggleInfoForm(service)} 
											color="primary" 
											fontSize="small"
											className={classes.infoIcon}
										/>
									</h2>
									<TimeSlotList 
										slots={slots}
										service={service}
										selectedSlot={selectedSlot}
										handleSelectDate={handleSelectDate}
									/>
												
								</div>
							)
						})}
					</div>
				</Container>
			</div>
			
			<BookingFormDialog 
				bookingFormOpen={bookingFormOpen}
				handleCloseBookingForm={handleCloseBookingForm}
				selectedSlot={selectedSlot}
			/>

			<ServiceInfoDialog 
				infoFormOpen={infoFormOpen}
				handleCloseInfoForm={() => handleToggleInfoForm(null)}
				service={selectedService}
			/>
			
		</div>
	)
}

export default connect(mapStateToProps, {
	setAccounts,
	setBookings
})(Calendar)