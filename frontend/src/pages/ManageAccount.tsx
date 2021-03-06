import React from 'react'
import { connect } from 'react-redux'
import {
	Container,
	Button,
	createStyles,
	makeStyles,
	Grid,
	Link
} from '@material-ui/core'

import { ArrowLeft } from '@material-ui/icons'
import { 
	useParams, 
	useHistory,
	Link as RouterLink
} from 'react-router-dom'

import { AppState } from '../store/types'

import ServiceList from './ServiceList'
import BookingList from './BookingList'
import NotAllowed from '../components/NotAllowed'

import { isAdmin, isOwner } from '../utils/helpers'

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
		banner: {
			background: '#eee',
			padding: '0.5em',
			display: 'flex',
			alignItems: 'center'
		},
		bannerLeft: {
			textAlign: 'left'
		},
		bannerRight: {
			textAlign: 'right'
		},
		bannerText: {
			marginRight: '1em',
			color: '#666'
		},
		content: {
			marginTop: '1em'
		},
		contentLeft: {
			borderRight: '1px solid #ddd',
			paddingRight: '2em'
		},
		contentRight: {
			paddingLeft: '4em'
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
			fontSize: '1.6rem',
			position: 'relative',
			fontWeight: 'bold',
			letterSpacing: -1,
			marginBottom: '0.8rem',
		},
		introText: {
			fontSize: '1.2rem',
			margin: '0.5rem auto 1rem',
		},
		containedBtn: {
			padding: '12px 20px',
			fontWeight: 'bold',
			margin: 0,
			width: 'auto',
		},
		textBtn: {
			padding: '12px 0',
			fontWeight: 'bold',
			margin: 0,
			width: 'auto',
		},
		sep: {
			padding: '0 15px'
		},
		adminLink: {
			textTransform: 'uppercase',
			fontSize: '14px',
			marginBottom: '1em',
			display: 'block',
		}
	})
)

const mapStateToProps = (state: AppState) => ({
	accountdata: state.accountdata,
	me: state.userdata.user
})
  
interface RouteParams {
	accountId: string|undefined
}

type Props = ReturnType<typeof mapStateToProps>

const ManageAccount = ({ accountdata, me }: Props):React.ReactElement => {

	const classes = stylesInUse()
	const history = useHistory()	

	const { accountId } = useParams<RouteParams>()
	const account = accountId ? accountdata.accounts.find(acc => acc.id === parseInt(accountId)) : undefined

	if (!account || !me || !(isAdmin(me, account) || isOwner(me, account))) {
		return <NotAllowed />
	}

	const handleClick = (path: string) => {
		return () => {
			history.push(path)
		}
	}

	return (
		<div className={classes.root}>

			<div className={classes.header}>
				<Container maxWidth="xl">
					<h1 className={classes.heading_1}>Manage {account?.name}</h1>
					<p className={classes.introText}>
						Manage services and bookings.
					</p>
				</Container>
			</div>

			
			<div className={classes.banner}>
				<Container maxWidth="xl">
					<Grid container direction="row">
						<Grid item xs={6} className={classes.bannerLeft}>
							<Button 
								color="primary"
								className={classes.textBtn}
								variant="text"
								disableElevation
								onClick={handleClick('/dashboard')}
							>
								<ArrowLeft></ArrowLeft> Dashboard
								
							</Button>
						</Grid>
						<Grid item xs={6} className={classes.bannerRight}>
							<Button
								color="primary"
								className={classes.textBtn}
								variant="text"
								size="small"
								disableElevation
								onClick={handleClick(`/account/${account?.id}/edit`)}
							>
						Edit organization
							</Button>
							<span className={classes.sep}></span>
							
							{isOwner(me, account) && 
								<Button
									color="primary"
									className={classes.textBtn}
									variant="text"
									size="small"
									disableElevation
									onClick={handleClick(`/account/${account?.id}/users`)}
								>
									Edit users
								</Button>
						
							}
							<span className={classes.sep}></span>	

							<Button
								color="primary"
								className={classes.containedBtn}
								variant="contained"
								size="small"
								disableElevation
								onClick={handleClick(`/account/${account?.id}/calendar`)}
							>
						View calendar
							</Button>
						</Grid>
					</Grid>

				</Container>
			</div>

			<div className={classes.content}>
				<Container maxWidth="xl">
					
					<Grid container direction="row">
						<Grid item xs={4} className={classes.contentLeft}>
							<h2 className={classes.heading_2}>Services</h2>
							<Link
								component={RouterLink}
								to={`/account/${account.id}/services/add`}
								className={classes.adminLink}
							>
														Add new service
							</Link>	
							<ServiceList account={account} />
							<Button 
								color="primary"
								className={classes.containedBtn}
								variant="contained"
								disableElevation
								onClick={handleClick(`/account/${account.id}/services/add`)}
							>
						Add new service
						
							</Button>
						</Grid>
						<Grid item xs={6} className={classes.contentRight}>
							<h2 className={classes.heading_2}>Recent bookings</h2>
							
							<Link
								component={RouterLink}
								to={`/account/${account?.id}/bookings`}
								className={classes.adminLink}
							>
													View all
							</Link>	
						
							
							{accountId ? <BookingList account={account} itemCount={4} /> : <></> }

						
							<Button 
								color="primary"
								className={classes.containedBtn}
								variant="contained"
								disableElevation
								onClick={handleClick(`/account/${account?.id}/bookings`)}
							>
					View all
					
							</Button>
						
							
						</Grid>
					</Grid>

					
				</Container>
			
			</div>
		</div>
	)
}

export default connect(mapStateToProps)(ManageAccount)