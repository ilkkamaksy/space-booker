import React from 'react'

import {
	createStyles,
	makeStyles,
} from '@material-ui/core'

import { 
	BookingAttributesType 
} from '../types'

const stylesInUse = makeStyles(() =>
	createStyles({
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
			cursor: 'default'
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
	})
)

interface Props {
	slot: BookingAttributesType
	selectedSlot: BookingAttributesType|null
	handleSelectDate: (slot:BookingAttributesType) => void
}

const TimeSlotItem = ({ 
	slot, 
	selectedSlot,
	handleSelectDate 
}:Props):React.ReactElement => {

	const classes = stylesInUse()

	if (slot.isReserved) {
		return (
			<div 
				className={classes.slotReserved}>
				<div>
					{slot.time}
				</div>
			</div>
		)
	}

	return (
		<div  
			className={selectedSlot && selectedSlot.id === slot.id && selectedSlot.service.id === slot.service.id ? classes.selectedSlot : classes.slot}
			onClick={() => handleSelectDate(slot)}
		>
			<div>
				{slot.time} 
			</div>
		</div>
	)
}

export default TimeSlotItem