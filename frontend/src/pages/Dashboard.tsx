import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useQuery } from 'react-query'
import {
	Button,
	createStyles,
	Link,
	makeStyles,
} from '@material-ui/core'
import { useHistory, Link as RouterLink } from 'react-router-dom'

import { getAccounts } from '../services/queries'

import { setAccounts } from '../store/actions/accounts'

import { AppState } from '../store/types'
import { Account } from '../types'

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
	
	console.log(query, accountdata)

	return (
		<div className={classes.root}>
			<div className={classes.intro}>
				<h1 className={classes.heading}>Dashboard</h1>
				<p className={classes.introText}>
                    Create a booking calendar for your working spaces in a few seconds.
				</p>
				{accountdata.accounts.map(item => {
					return <div key={item.id}>{item.name} - {item.id}</div>
				})}
				<Link
					component={RouterLink}
					to="/add-account"
				>
                    Add account info
				</Link>
				
			</div>
		</div>
	)
}

export default connect(mapStateToProps, {
	setAccounts
})(Dashboard)