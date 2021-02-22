import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useQuery } from 'react-query'
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

import { getAccounts } from '../services/queries'

import { setAccounts } from '../store/actions/accounts'

import { AppState } from '../store/types'
import { Account } from '../types'

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
})
  
type Props = ReturnType<typeof mapStateToProps>

interface DispatchProps { 
    setAccounts: (accounts:Account[]) => void
}

const Dashboard = ({ accountdata, setAccounts }: Props & DispatchProps):React.ReactElement => {

	const classes = stylesInUse()
	const history = useHistory()

	const handleClick = (path: string) => {
		return () => {
			history.push(path)
		}
	}

	const query = useQuery(['getAccounts', accountdata], getAccounts, { 
		enabled: accountdata.accounts.length === 0,
	})

	useEffect(() => {
		if (query.isSuccess && accountdata.accounts.length === 0 && query.data.data) {
			setAccounts(query.data.data)
		}
	}, [query, accountdata])
	
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
														to={`/account/${item.id}/services`}
													>
														{item.name}
													</Link>
												</React.Fragment>
											}
											secondary={
												<React.Fragment>
													<Link
														component={RouterLink}
														to={`/account/${item.id}/services`}
													>
														Manage
													</Link>
													{' | '} 
													<Link
														component={RouterLink}
														to={`/account/${item.id}/edit`}
													>
														Edit details
													</Link>
													{' | '} 
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

export default connect(mapStateToProps, {
	setAccounts
})(Dashboard)