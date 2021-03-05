import React from 'react'
import { LinearProgress } from '@material-ui/core'

import {
	createStyles,
	makeStyles,
} from '@material-ui/core'

const stylesInUse = makeStyles(() =>
	createStyles({
		root: {
			display: 'flex',
			alignItems: 'center',
			minHeight: '600px',
			height: '100vh',
			width: '100%',
			justifyContent: 'center'
		},
	})
)

const Loader = ():React.ReactElement => {

	const classes = stylesInUse()

	return (
		<div className={classes.root}>
			<LinearProgress />
		</div>
	)
}

export default Loader