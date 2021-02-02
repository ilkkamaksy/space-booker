import React from 'react'
import {
	createStyles,
	makeStyles,
	Link,
} from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

const stylesInUse = makeStyles(() =>
	createStyles({
		logo: {
			zIndex: 1250,
			width: '210px',
			marginRight: '2em'
		},
		logoImg: {
			width: '100%',
			height: 'auto',
			display: 'block'
		}
	})
)

const Logo = ():React.ReactElement => {
  
	const classes = stylesInUse()
  
	const logoImg = '/img/logo.png'

	return (
		<Link component={RouterLink} className={classes.logo} to="/">      
			<img 
				src={process.env.PUBLIC_URL + logoImg} 
				className={classes.logoImg} 
				alt="SpaceBooker"
			/>
		</Link>
	)
}

export default Logo
