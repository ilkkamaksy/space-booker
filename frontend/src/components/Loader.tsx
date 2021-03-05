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
			padding: '6em 0',
			textAlign: 'center',
			'& > * + *': {
				marginTop: '5em',
			},
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