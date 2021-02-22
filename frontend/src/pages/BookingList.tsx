import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useQuery } from 'react-query'
import {
	createStyles,
	makeStyles,
	List,
	ListItem,
	ListItemText
} from '@material-ui/core'

import { 
	getBookingsByAccountId
} from '../services/queries'

import { setBookings } from '../store/actions/bookings'

import { AppState } from '../store/types'
import { Booking, Account } from '../types'

const stylesInUse = makeStyles(() =>
	createStyles({
		root: {
			background: '#FFFFFF',
			position: 'relative',
			justifyContent: 'center',
			alignItems: 'center',

		},
		header: {
			background: '#6A0572',
			justifyContent: 'center',
			alignItems: 'center',
			paddingTop: '40px',
			paddingBottom: '50px',
			color:'#ffffff'
		},
		content: {

		},
		intro: {
			color: '#ffffff',
			textAlign: 'center',
			position: 'relative',
			zIndex: 1,
		},
		heading_1: {
			fontSize: '3rem',
			position: 'relative',
			fontWeight: 'bold',
			letterSpacing: -1,
			margin: '1rem 0 0.5rem 0',
		},
		heading_2: {
			fontSize: '2rem',
			position: 'relative',
			fontWeight: 'bold',
			letterSpacing: -1,
			marginBottom: '1rem',
		},
		introText: {
			fontSize: '1.2rem',
			margin: '0.5rem auto 1rem',
		},
		listItem: {
			paddingLeft: 0
		},
		listTitle: {
			fontSize: '1.1em',
			fontWeight: 'bold',
			color:'#000'
		},
		containedBtn: {
			backgroundColor: '#6A0572',
			padding: '12px 20px',
			fontWeight: 'bold',
			color: '#ffffff',
			margin: '0 0.5em',
			width: 'auto',
		},
		notice: {
			fontSize: '1em',
			margin: '1rem 0 1.5rem',
			color:'#111'
		},
	})
)

const mapStateToProps = (state: AppState) => ({
	bookingData: state.bookingData,
})
  
type StateProps = ReturnType<typeof mapStateToProps>

type Props = {
    account: Account|undefined
}

interface DispatchProps { 
	setBookings: (bookings: Booking[]) => void
}

const Services = ({ 
	account, 
	bookingData,
	setBookings 
}: Props & StateProps & DispatchProps):React.ReactElement => {

	const classes = stylesInUse()

	if (!account) {
		return <></>
	}

	const queryAccountBookings = useQuery(['getBookingsByAccountId', account.id], () => getBookingsByAccountId(account.id.toString()), { 
		enabled: !!account 
	})

	useEffect(() => {
		if (
			queryAccountBookings.isSuccess && 
            queryAccountBookings.data.data
		) {
			setBookings(queryAccountBookings.data.data)
		}

	}, [queryAccountBookings])

	const accountBookings = bookingData.bookings.filter(item => item.service?.account_id === account.id)

	if (accountBookings.length === 0) {
		return <p className={classes.notice}>{'There are not bookings yet.'} </p>
	}

    
	return (
		<div className={classes.root}>
			<List>
				{accountBookings.map(booking => {
					const dateStr = new Date(booking.dateTime).toString()
					const date = dateStr.split(':00 GMT')[0]
					return (
						<ListItem key={booking.id} className={classes.listItem}>
							<ListItemText
								className={classes.heading_2}
								primary={
									<React.Fragment>
										<div className={classes.listTitle}>
											{`${booking.service?.name} - ${date.substr(0, date.length-5)} on ${date.substr(date.length-5, date.length)}`}
										</div>
									</React.Fragment>
								}
								secondary={
									<React.Fragment>
										<div>
											{`User: ${booking.email}`}
										</div>	
									</React.Fragment>
								}
							/>
						</ListItem>
					)
				})}
			</List>
		</div>
	)
}

export default connect(mapStateToProps, {
	setBookings
})(Services)