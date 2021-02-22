import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useQuery } from 'react-query'
import {
	Container,
	Button,
	createStyles,
	makeStyles,
	Grid,
} from '@material-ui/core'
import { 
	useParams, 
	useHistory,
} from 'react-router-dom'

import { 
	getAccounts,
} from '../services/queries'

import { setAccounts } from '../store/actions/accounts'

import { AppState } from '../store/types'
import { Account } from '../types'

import ServiceList from './ServiceList'
import BookingList from './BookingList'

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
		containedBtn: {
			backgroundColor: '#6A0572',
			padding: '12px 20px',
			fontWeight: 'bold',
			color: '#ffffff',
			margin: '0 0.5em',
			width: 'auto',
		},
	})
)

const mapStateToProps = (state: AppState) => ({
	accountdata: state.accountdata,
})
  
interface RouteParams {
	accountId: string|undefined
}

type Props = ReturnType<typeof mapStateToProps>

interface DispatchProps { 
    setAccounts: (accounts:Account[]) => void
}

const Services = ({ accountdata, setAccounts }: Props & DispatchProps):React.ReactElement => {

	const [addNewSpacePath, setAddNewSpacePath] = useState('/dashboard')
	const [subTitle, setSubTitle] = useState('Your services')
	const classes = stylesInUse()
	const history = useHistory()	

	const { accountId } = useParams<RouteParams>()
	const account = accountId ? accountdata.accounts.find(acc => acc.id === parseInt(accountId)) : undefined

	const handleClick = (path: string) => {
		return () => {
			history.push(path)
		}
	}

	const queryAccounts = useQuery(['getAccounts', accountdata], getAccounts, { 
		enabled: accountdata.accounts.length === 0,
	})

	useEffect(() => {
		if (account) {
			setAddNewSpacePath(`/account/${account.id}/services/add`)
			setSubTitle(`Services for ${account.name}`)
		}

		if (
			!account &&
			queryAccounts.isSuccess && 
            accountdata.accounts.length === 0 && 
            queryAccounts.data.data
		) {
			setAccounts(queryAccounts.data.data)
		}

	}, [queryAccounts, accountdata, account])

	return (
		<div className={classes.root}>
			
			<div className={classes.header}>
				<Container maxWidth="xl">
					<h1 className={classes.heading_1}>Manage services</h1>
					<p className={classes.introText}>
						Manage account services.
					</p>
				</Container>
			</div>
			

			<div className={classes.content}>
				<Container maxWidth="xl">
					
					<Grid container direction="row">
						<Grid item xs={6}>
							<h2 className={classes.heading_2}>{subTitle}</h2>
							<ServiceList account={account} />
							<Button 
								color="primary"
								className={classes.containedBtn}
								variant="contained"
								disableElevation
								onClick={handleClick(addNewSpacePath)}
							>
						Add new service
						
							</Button>
						</Grid>
						<Grid item xs={6}>
							<h2 className={classes.heading_2}>Recent bookings</h2>
							{accountId ? <BookingList account={account} /> : <></> }
						</Grid>
					</Grid>

					
				</Container>
			</div>
		</div>
	)
}

export default connect(mapStateToProps, {
	setAccounts,
})(Services)