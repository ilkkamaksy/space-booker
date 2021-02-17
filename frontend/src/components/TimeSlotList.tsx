import React from 'react'

import {
	createStyles,
	makeStyles,
} from '@material-ui/core'

import { 
	Service,
	BookingAttributesType 
} from '../types'

import TimeSlotItem from './TimeSlotItem'

const stylesInUse = makeStyles(() =>
	createStyles({
		gridContent: {
			display: 'flex',
			flexDirection: 'column'
		},
	})
)

interface Props {
    service: Service
	slots: BookingAttributesType[]
	selectedSlot: BookingAttributesType|null
	handleSelectDate: (slot:BookingAttributesType) => void
}

const TimeSlotList = ({ 
	service, 
	slots, 
	selectedSlot,
	handleSelectDate 
}:Props):React.ReactElement => {

	const classes = stylesInUse()

	return (
		<div className={classes.gridContent}>
			{slots.map(slot => {
				if (!slot) {
					return
				}
					
				return <TimeSlotItem 
					key={`${service.id}-${slot.id}`} 
					slot={slot} 
					selectedSlot={selectedSlot} 
					handleSelectDate={handleSelectDate} 
				/>

			})}
		</div>
	)
}

export default TimeSlotList