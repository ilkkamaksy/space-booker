import React from 'react'
import { connect } from 'react-redux'
import {
	Container,
	Button,
	createStyles,
	makeStyles,
	List,
	ListItem,
	ListItemText,
	Link
} from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

import { useHistory } from 'react-router-dom'
import { AppState } from '../store/types'

import { isAdmin, isOwner } from '../utils/helpers'

import NotAllowed from '../components/NotAllowed'

const stylesInUse = makeStyles(() =>
	createStyles({
		root: {
			background: '#FFFFFF',
			position: 'relative',
			justifyContent: 'center',
			alignItems: 'center',

		},
		header: {
			background: '#6A0572',
			justifyContent: 'center',
			alignItems: 'center',
			paddingTop: '40px',
			paddingBottom: '50px',
			color:'#ffffff'
		},
		content: {

		},
		intro: {
			color: '#ffffff',
			textAlign: 'center',
			position: 'relative',
			zIndex: 1,
		},
		heading_1: {
			fontSize: '3rem',
			position: 'relative',
			fontWeight: 'bold',
			letterSpacing: -1,
			margin: '1rem 0 0.5rem 0',
		},
		heading_2: {
			fontSize: '2rem',
			position: 'relative',
			fontWeight: 'bold',
			letterSpacing: -1,
			marginBottom: '1rem',
		},
		introText: {
			fontSize: '1.2rem',
			margin: '0.5rem auto 1rem',
		},
		notice: {
			fontSize: '1em',
			margin: '1rem 0 1.5rem',
			color:'#111'
		},
		listItem: {
			paddingLeft: 0
		},
		listTitle: {
			fontSize: '1.2em',
			fontWeight: 'bold',
			color:'#000'
		},
		itemsLeft: {
			display: 'inline-block'
		},
		sep: {
			borderLeft: '1px solid #ddd',
			padding: '0 4px 0 0',
			margin: '0 4px 0 8px'
		},
		containedBtn: {
			backgroundColor: '#6A0572',
			padding: '12px 20px',
			fontWeight: 'bold',
			color: '#ffffff',
			margin: 0,
			width: 'auto',
		},
	})
)

const mapStateToProps = (state: AppState) => ({
	accountdata: state.accountdata,
	me: state.userdata.user,
	updateUser: state.userdata.updateUser
})
  
type Props = ReturnType<typeof mapStateToProps>

const Dashboard = ({ accountdata, me, updateUser }: Props):React.ReactElement => {

	const classes = stylesInUse()

	if (!me && !updateUser) {
		return <NotAllowed />
	}

	const history = useHistory()

	const handleClick = (path: string) => {
		return () => {
			history.push(path)
		}
	}

	return (
		<div className={classes.root}>
			
			<div className={classes.header}>
				<Container maxWidth="xl">
					<h1 className={classes.heading_1}>Dashboard</h1>
					<p className={classes.introText}>
						Manage your organizations and bookings.
					</p>
				</Container>
			</div>
			
			<div className={classes.content}>
				
				<Container maxWidth="xl">
					<h2 className={classes.heading_2}>Your organizations</h2>
				
					{accountdata.accounts.length === 0 
						? <p className={classes.notice}>{'You haven\'t added any organizations yet. Add one to get started!'} </p>
						
						: <List>
							{accountdata.accounts.map(item => {
								return (
									<ListItem key={item.id} className={classes.listItem}>
										<ListItemText
											className={classes.heading_2}
											primary={
												<React.Fragment>
													<Link
														className={classes.listTitle}
														component={RouterLink}
														to={!(isAdmin(me, item) || isOwner(me, item)) ? `/account/${item.id}/calendar` : `/account/${item.id}/manage`}
													>
														{item.name}
													</Link>
												</React.Fragment>
											}
											secondary={
												<React.Fragment>
													{(isAdmin(me, item) || isOwner(me, item)) && 
													<div className={classes.itemsLeft}>
														<Link
															component={RouterLink}
															to={`/account/${item.id}/manage`}
														>
															Manage
														</Link>
														<span className={classes.sep} />
														<Link
															component={RouterLink}
															to={`/account/${item.id}/edit`}
														>
															Edit details
														</Link>
														<span className={classes.sep} />
													</div>
													}
													
													<Link
														component={RouterLink}
														to={`/account/${item.id}/calendar`}
													>
														View Calendar
													</Link>	
												</React.Fragment>
											}
										/>
									</ListItem>
								) 
							})}
						</List>
					}

					
					<Button 
						color="primary"
						className={classes.containedBtn}
						variant="contained"
						disableElevation
						onClick={handleClick('/add-account')}
					>
						Add new organization
						
					</Button>
					
				</Container>
				
			</div>
		</div>
	)
}

export default connect(mapStateToProps)(Dashboard)