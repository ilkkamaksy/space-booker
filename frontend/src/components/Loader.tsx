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
			height: 'calc(100vh - 66px)',
			alignItems: 'center',
			justifyItems: 'center',
			justifyContent: 'center',
			'& > * + *': {
				marginTop: '5em',
			},
			background: '#fff',
			borderTop: '1px solid #eee',
			position: 'absolute',
			top: '64px',
			left: 0,
			display: 'flex',
			zIndex: 10
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