import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, makeStyles, createStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import { AppState } from '../store/types'

const stylesInUse = makeStyles(() =>
	createStyles({
		root: {
			background: '#6A0572',
			display: 'flex',
			position: 'relative',
			justifyContent: 'center',
			alignItems: 'center',
			height: 'calc(100vh - 64px)',
		},
		intro: {
			color: '#ffffff',
			textAlign: 'center',
			position: 'relative',
			zIndex: 1,
		},
		heading: {
			fontSize: '4rem',
			position: 'relative',
			fontWeight: 'bold',
			letterSpacing: -1,
			marginBottom: '1rem',
		},
		introText: {
			fontSize: '1.5rem',
			marginTop: '0 auto 2rem',
		},
		containedBtn: {
			backgroundColor: '#df0cc4',
			padding: '12px 0',
			fontWeight: 'bold',
			color: '#ffffff',
			margin: '0 0.5em',
			width: 180,
		},
		outlinedBtn: {
			padding: '12px 0',
			fontWeight: 'bold',
			color: '#ffffff',
			margin: '0 0.5em',
			width: 180,
			borderColor: 'rgba(255,255,255,0.5)',
			'&:hover': {
				borderColor: '#fff',
			},
		},
	})
)

const mapStateToProps = (state: AppState) => ({
	user: state.userdata.user
})

type Props = ReturnType<typeof mapStateToProps>;

const Home = ({ user }: Props):React.ReactElement => {

	if (user?.username) {
		return <Redirect to="/dashboard" />
	}

	const classes = stylesInUse()
	const history = useHistory()

	const handleClick = (path: string) => {
		return () => {
			history.push(path)
		}
	}

	return (
		<div className={classes.root}>
			<div className={classes.intro}>
				<h1 className={classes.heading}>Working spaces booking app</h1>
				<p className={classes.introText}>
                    Create a booking calendar for your working spaces in a few seconds.
				</p>

				<Button
					color="primary"
					className={classes.containedBtn}
					variant="contained"
					size="large"
					onClick={handleClick('/register')}
					disableElevation
				>
                    Sign up
				</Button>
				<Button
					color="secondary"
					className={classes.outlinedBtn}
					variant="outlined"
					size="large"
					onClick={handleClick('/login')}
					disableElevation
				>
                    Login
				</Button>
			</div>
		</div>
	)
}

export default connect(mapStateToProps)(Home)
