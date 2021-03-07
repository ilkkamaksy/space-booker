import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { useMutation } from 'react-query'
import { Formik, Form, FormikProps } from 'formik'
import {
	Grid,
	TextField,
	Button,
	makeStyles,
	createStyles,
} from '@material-ui/core'
import { register, login } from '../../services/queries'

import { AppState } from '../../store/types'

import { setToken, setUser } from '../../store/actions/user'

import * as Yup from 'yup'

const RegisterSchema = () => {
	return Yup.object().shape({
		email: Yup.string().email().required('Email address is mandatory.'),
		username: Yup.string()
			.required('Please choose your username.')
			.min(3, 'Username must be at least 3 characters long.')
			.max(50, 'Username can be maximum 50 characters long.')
			.required('Username is mandatory.'),
		password: Yup.string()
			.min(8, 'Password must be at least 8 characters long.')
			.matches(
				/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!?@#$%^&*()]).{7,30}\S$/
			)
			.required(
				'Password must have at least one number, one uppercase character, lowercase  character and special character from !?@#$%^&*() '
			),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('password'), ''], 'Passwords must match.')
			.required('Passwords must match.'),
	})
}

const stylesInUse = makeStyles((theme) =>
	createStyles({
		root: {
			width: '100%',
			margin: '0 auto',
			backgroundColor: '#f1f1f1',
			height: 'calc(100vh - 64px)',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
		},
		form: {
			backgroundColor: '#fff',
			padding: '2em 3em 3em',
			borderRadius: '8px',
			maxWidth: '400px'
		},
		textField: {
			'& > *': {
				width: '100%',
			},
		},
		inputField: {
			margin: '5px 0 20px',
		},
		registerButton: {
			marginTop: '10px',
			backgroundColor: '#6A0572',
			padding: '12px 20px',
			fontWeight: 'bold',
			color: '#ffffff',
			margin: '0 0.5em 0 0',
			width: 'auto',
		},
		title: { textAlign: 'left' },
		successMessage: { color: theme.palette.success.main },
		errorMessage: { color: theme.palette.error.main },
	})
)

interface FormStatus {
  type: string
  message: string
}

interface FormStatusProps {
  [key: string]: FormStatus
}

interface UserData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const formStatusProps: FormStatusProps = {
	success: {
		message: 'Registered successfully.',
		type: 'success',
	},
	error: {
		message: 'Registeration failed: username or email already registered.',
		type: 'error',
	},
}

const mapStateToProps = (state: AppState) => ({
	user: state.userdata.user
})
  
type Props = ReturnType<typeof mapStateToProps>;

interface DispatchProps { 
    setToken: (token:string) => void,
}

const Register = ({ user, setToken }: Props & DispatchProps):React.ReactElement => {

	const [formStatus, setFormStatus] = useState<FormStatus>({
		message: '',
		type: '',
	})
	const [showFormStatus, setShowFormStatus] = useState(false)
	const [userdata, setUserdata] = useState({ username: '', password: ''})

	const [redirect, setRedirect] = useState(false)

	const classes = stylesInUse()
	
	const registerMutation = useMutation(register, {
		onError: () => {
			setFormStatus(formStatusProps.error)
			setShowFormStatus(true)
		}, 
		onSuccess: () => {
			setFormStatus(formStatusProps.success)
			setShowFormStatus(true)
		}
	})

	const createNewAccount = async (userData: UserData) => {
		
		registerMutation.mutate({
			username: userData.username,
			email: userData.email,
			password: userData.password
		})

		setUserdata({ 
			username: userData.username, 
			password: userData.password 
		})
	}

	const loginMutation = useMutation(login, { 
		onError: () => {
			setFormStatus(formStatusProps.error)
			setShowFormStatus(true)
		}
	})

	const logInUser = async (userData: { username: string, password: string }) => {
		loginMutation.mutate({
			username: userData.username,
			password: userData.password
		})
	}

	useEffect(() => {
		if (registerMutation.isSuccess && userdata.username && userdata.password && !loginMutation.isLoading) {
			logInUser(userdata)
		}
	
		if (loginMutation.isSuccess) {
			localStorage.setItem('access_token', loginMutation.data?.data?.access_token ?? '')
			setToken(loginMutation.data?.data?.access_token ?? '')
			setRedirect(true)
		}
	}, [registerMutation, user, loginMutation])

	if (redirect || user?.username) {
		return <Redirect to="/dashboard" />
	}

	return (
		<div className={classes.root}>
			<Formik
				initialValues={{
					username: '',
					email: '',
					password: '',
					confirmPassword: '',
				}}
				onSubmit={(values: UserData, actions) => {
					createNewAccount(values)
					setTimeout(() => {
						actions.setSubmitting(false)
					}, 400)
				}}
				validationSchema={RegisterSchema}
			>
				{(props: FormikProps<UserData>) => {
					const {
						handleBlur,
						handleChange,
						values,
						isSubmitting,
						touched,
						errors,
					} = props

					return (
						<Form className={classes.form}>
							<Grid container direction="row">
								<Grid item className={classes.title} xs={12}>
									<h1>Sign up!</h1>
								</Grid>

								<Grid item xs={12}>
									<TextField
										id="username"
										name="username"
										type="text"
										label="Username"
										variant="outlined"
										fullWidth
										className={classes.inputField}
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
								<Grid item xs={12}>
									{' '}
									<TextField
										id="email"
										name="email"
										type="text"
										label="Email"
										variant="outlined"
										fullWidth
										className={classes.inputField}
										value={values.email}
										onChange={handleChange}
										onBlur={handleBlur}
										helperText={
											touched.email && errors.email
												? errors.email
												: ''
										}
										error={touched.email && errors.email ? true : false}
									/>
								</Grid>

								<Grid item xs={12}>
									<TextField
										id="password"
										name="password"
										type="password"
										label="Password"
										variant="outlined"
										fullWidth
										className={classes.inputField}
										value={values.password}
										onChange={handleChange}
										onBlur={handleBlur}
										helperText={
											touched.password && errors.password
												? 'Make sure your password is minimum of 8 characters long and consists of at least 1 uppercase, lowercase, number and one special ' +
                          'character from !?@#$%^&*(). Password cannot end with an empty space.'
												: ''
										}
										error={touched.password && errors.password ? true : false}
									/>
								</Grid>

								<Grid item xs={12}>
									<TextField
										id="confirmPassword"
										name="confirmPassword"
										type="password"
										label="Confirm password"
										variant="outlined"
										fullWidth
										className={classes.inputField}
										value={values.confirmPassword}
										onChange={handleChange}
										onBlur={handleBlur}
										helperText={
											touched.confirmPassword && errors.confirmPassword
												? 'Your confirmation did not match with your password. Please try again.'
												: ''
										}
										error={
											touched.confirmPassword && errors.confirmPassword
												? true
												: false
										}
									/>
								</Grid>

								<Grid item xs={6}>
									<Button
										color="primary"
										type="submit"
										variant="contained"
										className={classes.registerButton}
										disabled={isSubmitting}
									>
										{' '}
                                        Sign up
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
	setToken,
	setUser
})(Register)