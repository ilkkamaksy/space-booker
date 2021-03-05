import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useMutation } from 'react-query'
import * as Yup from 'yup'
import { Formik, Form, Field, FormikProps } from 'formik'
import {
	Grid,
	TextField,
	Button,
	makeStyles,
	createStyles,
	InputLabel
} from '@material-ui/core'

import { addAccountUser } from '../../services/queries'

import { 
	startAction, 
	setSingleAccount,
} from '../../store/actions/accounts'

import { AppState } from '../../store/types'
import { 
	Account, 
} from '../../types'

const stylesInUse = makeStyles((theme) =>
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
		containedBtn: {
			backgroundColor: '#6A0572',
			padding: '12px 20px',
			fontWeight: 'bold',
			color: '#ffffff',
			margin: '0 0.5em',
			width: 'auto',
		},
		outlinedBtn: {
			padding: '12px 20px',
			fontWeight: 'bold',
			color: '#6A0572',
			margin: '0 0.5em',
			width: 'auto',
			borderColor: 'rgba(0,0,0,0.5)',
			'&:hover': {
				borderColor: '#6A0572',
			},
		},
		deleteBtn: {
			padding: '12px 20px',
			fontWeight: 'bold',
			color: 'red',
			margin: '1em 0.5em',
			width: 'auto',
			borderColor: 'rgba(0,0,0,0.5)',
			'&:hover': {
				borderColor: '#6A0572',
			},
		},
		dangerZone: {
			margin: '4em 0',
		},
		textField: {
			margin: '5px 0 30px',
			'& > *': {
				width: '100%',
			},
		},
		select: {
			marginTop: '6px',
			paddingTop: '12px',
			paddingBottom: '12px'
		},
		submitButton: {
			marginTop: '0',
		},
		title: { textAlign: 'left' },
		successMessage: { color: theme.palette.success.main },
		errorMessage: { color: theme.palette.error.main },
		userList: {
			margin: '1em 0 2em',
		}, 
		userListItem: {
			padding: '0.5em 0',
			color: '#444'
		}
	})
)

interface FormStatus {
  type: string
  message: string
}

interface FormStatusProps {
  [key: string]: FormStatus
}

interface AccountFormFields {
  username: string
  role: string
}

const formStatusProps: FormStatusProps = {
	error: {
		message: 'Username not found. Please try again.',
		type: 'error',
	},
	success: {
		message: 'User added to account!',
		type: 'success',
	},
}

const mapStateToProps = (state: AppState) => ({
	accountdata: state.accountdata,
	userdata: state.userdata
})
  
type StateProps = ReturnType<typeof mapStateToProps>

interface DispatchProps { 
	setSingleAccount: (account:Account) => void
	startAction: () => void
}

interface Props {
	accountToEdit: Account
}

const EditAccountUsers = ({ 
	accountdata, 
	accountToEdit,
	startAction, 
	setSingleAccount,
}: StateProps & DispatchProps & Props):React.ReactElement => {

	const [formStatus, setFormStatus] = useState<FormStatus>({
		message: '',
		type: '',
	})
	const classes = stylesInUse()

	const [showFormStatus, setShowFormStatus] = useState(false)

	const AccountSchema = Yup.object().shape({
		username: Yup.string().required('Please enter a username.'),
		role: Yup.string().required('Please enter a role.'),
	})

	const updateMutation = useMutation(addAccountUser, { 
		onError: () => {
			setFormStatus(formStatusProps.error)
			setShowFormStatus(true)
		},
		onSuccess: () => {
			setFormStatus(formStatusProps.success)
			setShowFormStatus(true)
			startAction()
		}
	})

	const saveAccountData = async (accountData: AccountFormFields) => {
		if (accountToEdit) {
			updateMutation.mutate({
				account: accountToEdit,
				username: accountData.username,
				role: accountData.role,
			})
		} 
	}

	useEffect(() => {
		
		const updatedAccount = updateMutation.data?.data
		if (
			updateMutation.isSuccess &&
			!updateMutation.isLoading &&
			updatedAccount &&
			accountdata.updating
		) {
			setSingleAccount(updatedAccount)
		}		

	}, [updateMutation, accountdata])
	
	return (
		<div className={classes.root}>
			<div className={classes.userList}>
				{accountToEdit.user_roles.map(item => {
					return (
						<div key={item.id} className={classes.userListItem}><strong>{item.user.username}</strong> ({item.user.email}) - {item.role.role}</div>
					)
				})}
			</div>
			<Formik
				initialValues={{
					username: '',
					role: 'admin',
				}}
				onSubmit={(values: AccountFormFields, actions) => {
					saveAccountData(values)
					setTimeout(() => {
						actions.setSubmitting(false)
					}, 400)
				}}
				validationSchema={AccountSchema}
			>
				{(props: FormikProps<AccountFormFields>) => {
					const {
						handleBlur,
						handleChange,
						values,
						isSubmitting,
						touched,
						errors,
					} = props

					return (
						
							
						<Form>
							<Grid container direction="row">
								<Grid item className={classes.textField} xs={8}>
									<TextField
										id="username"
										name="username"
										type="text"
										label="Username"
										variant="outlined"
										value={values.username}
										onChange={handleChange}
										onBlur={handleBlur}
										helperText={
											touched.username && errors.username
												? errors.username
												: ''
										}
										error={touched.username && errors.username ? true : false}
									/>
								</Grid>

								<Grid item className={classes.textField} xs={8}>
									
									<InputLabel>Role</InputLabel>
									<Field as="select" name="role" onChange={handleChange} className={classes.select} value={values.role}>
										<option value="admin">Admin (can edit services, account info and manage bookings)</option>
										<option value="user">User (can use the booking calendar)</option>
									</Field>
								</Grid>


								<Grid item className={classes.submitButton} xs={6}>
									<Button
										color="primary"
										type="submit"
										variant="contained"
										disabled={isSubmitting}
										className={classes.containedBtn}
									>
										{' '}
                                        Add user to account
									</Button>

									{showFormStatus && (
										<div className="formStatus">
											{formStatus.type === 'success' ? (
												<p className={classes.successMessage}>
													{formStatus.message}
												</p>
											) : formStatus.type === 'error' ? (
												<p className={classes.errorMessage}>
													{formStatus.message}
												</p>
											) : null}
										</div>
									)}
								</Grid>
							</Grid>
						</Form>
					)
				}}
			
			</Formik>
			
		</div>
	)
}

export default connect(mapStateToProps, {
	startAction,
	setSingleAccount,
})(EditAccountUsers)