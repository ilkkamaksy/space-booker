import React from 'react'

import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button,
	makeStyles,
	createStyles,
} from '@material-ui/core'
import { Service } from '../types'

const stylesInUse = makeStyles(() =>
	createStyles({
		root: {
			minWidth: '500px'
		},
	})
)

interface Props {
    infoFormOpen: boolean
    handleCloseInfoForm: () => void
    service: Service|null
}

const ServiceInfoDialog = ({ 
	infoFormOpen, 
	handleCloseInfoForm,
	service
}: Props):React.ReactElement => {

	if (!service) {
		return <></>
	}

	const classes = stylesInUse()

	return (
		<Dialog open={infoFormOpen} onClose={handleCloseInfoForm} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">{service.name}</DialogTitle>
			<DialogContent className={classes.root}>
				<DialogContentText>
					{service.description}
				</DialogContentText>
				
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCloseInfoForm} color="primary" variant="contained">
            Close
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default ServiceInfoDialog