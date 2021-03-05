import React from 'react'

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

const NotAllowed = ():React.ReactElement => {

	const classes = stylesInUse()

	return (
		<div className={classes.root}>
			<h2>Sorry, that&lsquo;s not allowed.</h2>
		</div>
	)
}

export default NotAllowed