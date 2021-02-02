import React from 'react'
import {
	AppBar,
	createStyles,
	Link,
	makeStyles,
	Toolbar,
} from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

import { UserType } from '../types'

import Logo from './Logo'

interface Props {
	user: UserType|undefined,
	logout: () => void
}

const stylesInUse = makeStyles(() =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		appBar: {
			zIndex: 1250,
			backgroundColor: '#ffffff'
		},
		linkBtnTransparent: {
			padding: '0.8em 1em',
			border: '1px solid transparent',
			'&:hover': {
				textDecoration: 'none',
				opacity: 0.8,
			},
		},
		linkBtnBordered: {
			padding: '0.8em 1em',
			borderRadius: '4px',
			border: '1px solid rgba(98,0,238, 0.4)',
			'&:hover': {
				textDecoration: 'none',
				backgroundColor: 'rgba(0,0,0,0.02)',
				opacity: 0.8,
			},
		},
		loginGreet: {
			fontSize: '.95em',
			marginRight: '1em',
			color: '#000'
		},
		sectionLeft: {
			flexGrow: 1,
			textAlign: 'left'
		},
		toggleButton: {
			marginRight: 25,
		},
	})
)

const Header = ({ user, logout }: Props):React.ReactElement => {

	const classes = stylesInUse()

	return (
		<div className={classes.root}>
			<AppBar position="static" className={classes.appBar}>
				<Toolbar>
					<Logo />
					<div className={classes.sectionLeft}>
						<Link
							component={RouterLink}
							className={classes.linkBtnTransparent}
							to="/dashboard"
						>
                            Dashboard
						</Link>
					</div>
					<div>
						{!user && (
							<div>
								<Link
									component={RouterLink}
									className={classes.linkBtnTransparent}
									to="/login"
								>
                                Login
								</Link>
						
								<Link
									component={RouterLink}
									className={classes.linkBtnBordered}
									to="/register"
								>
                                Sign up
								</Link>
							</div>			
						)}
						{user && (
							<div>
								<span className={classes.loginGreet}>
                                    Hello, {user.username}
								</span>
								<Link
									component={RouterLink}
									className={classes.linkBtnBordered}
									to="/"
									onClick={logout}
								>
                                    Logout
								</Link>
							</div>
						)}
					</div>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default Header
