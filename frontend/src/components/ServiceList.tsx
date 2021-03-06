import React from 'react'
import {
	createStyles,
	makeStyles,
	List,
	ListItem,
	ListItemText,
	Link
} from '@material-ui/core'
import { 
	Link as RouterLink, 
} from 'react-router-dom'

import { Account } from '../types'

const stylesInUse = makeStyles(() =>
	createStyles({
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
		notice: {
			fontSize: '1em',
			margin: '1rem 0 1.5rem',
			color:'#111'
		},
		listItem: {
			paddingLeft: 0
		},
		itemMeta: {
			margin: '2px 0 5px'
		},
		listTitle: {
			fontSize: '1.2em',
			fontWeight: 'bold',
			color:'#000'
		},
	})
)


type Props = {
    account: Account|undefined
}

const ServiceList = ({ account }: Props):React.ReactElement => {

	const classes = stylesInUse()

	if (!account || account.services.length === 0) {
		return <p className={classes.notice}>{'You haven\'t added any services yet. Add one to get started!'} </p>
	}
	
	return (
		<List>
			{account && account.services.map(item => {
				return (
					<ListItem key={item.id} className={classes.listItem}>
						<ListItemText
							className={classes.heading_2}
							primary={
								<React.Fragment>
									<Link
										className={classes.listTitle}
										component={RouterLink}
										to={`/account/${account.id}/services/${item.id}/edit`}
									>
										{item.name}
									</Link>
								</React.Fragment>
							}
							secondary={
								<React.Fragment>
									<div>
										<div className={classes.itemMeta}>
											<span>Hours: {item.startTime.substr(0, 5)} - {item.endTime.substr(0, 5)} | Timeslot: {item.timeSlotLen} min | Max bookings: {item.maxBookings} per slot</span>
										</div>
										
										<Link
											component={RouterLink}
											to={`/account/${account.id}/services/${item.id}/edit`}
										>
														Edit
										</Link>	

									</div>
									
								</React.Fragment>
							}
						/>
					</ListItem>
				) 
			})}
		</List>
	)
}

export default ServiceList