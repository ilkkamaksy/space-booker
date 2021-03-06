import React from 'react'
import { CircularProgress } from '@material-ui/core'

import {
	createStyles,
	makeStyles,
} from '@material-ui/core'

const stylesInUse = makeStyles(() =>
	createStyles({
		root: {
			width: '100%',
			height: '100vh',
			alignItems: 'center',
			textAlign: 'center',
			'& > * + *': {
				marginTop: '5em',
			},
			background: 'rgba(255,255,255,0.9)',
			position: 'fixed',
			top: 0,
			left: 0
		},
	})
)

const Loader = ():React.ReactElement => {

	const classes = stylesInUse()

	return (
		<div className={classes.root}>
			<CircularProgress color="secondary" />
		</div>
	)
}

export default Loader