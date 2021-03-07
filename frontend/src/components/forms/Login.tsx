import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useMutation } from 'react-query'
import * as Yup from 'yup'
import { Formik, Form, FormikProps } from 'formik'
import {
	Grid,
	TextField,
	Button,
	makeStyles,
	createStyles,
} from '@material-ui/core'

import { AppState } from '../../store/types'
import { Account } from '../../types'

import { setToken, setUser } from '../../store/actions/user'
import { setAccounts } from '../../store/actions/accounts'

import { login } from '../../services/queries'

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
		loginButton: {
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

interface LoginFormFields {
  username: string
  password: string
}

const formStatusProps: FormStatusProps = {
	error: {
		message: 'Invalid username or password. Please try again.',
		type: 'error',
	},
}

const mapStateToProps = (state: AppState) => ({
	user: state.userdata.user
})
  
type Props = ReturnType<typeof mapStateToProps>;

interface DispatchProps { 
    setToken: (token:string) => void
	setAccounts: (accounts: Account[]) => void
}

const Login = ({ user, setToken, setAccounts }: Props & DispatchProps):React.ReactElement => {
	const [formStatus, setFormStatus] = useState<FormStatus>({
		message: '',
		type: '',
	})
	const classes = stylesInUse()
	const [showFormStatus, setShowFormStatus] = useState(false)
	const [redirect, setRedirect] = useState(false)

	const mutation = useMutation(login, { 
		onError: () => {
			setFormStatus(formStatusProps.error)
			setShowFormStatus(true)
		},
		onSuccess: () => setAccounts([])
	})

	const logInUser = async (userData: LoginFormFields) => {
		mutation.mutate({
			username: userData.username,
			password: userData.password
		})
	}
    
	useEffect(() => {
		if (mutation.isSuccess && !mutation.isLoading) {
			localStorage.setItem('access_token', mutation.data?.data?.access_token ?? '')
			setToken(mutation.data?.data?.access_token ?? '')
			setRedirect(true)
		}
	}, [mutation])

	if (redirect && mutation.isSuccess || user?.username) {
		return <Redirect to="/dashboard" />
	}

	const UserSchema = Yup.object().shape({
		username: Yup.string().required('Please enter your username.'),
		password: Yup.string().required('Please enter your password.'),
	})

	return (
		<div className={classes.root}>
			<Formik
				initialValues={{
					username: '',
					password: '',
				}}
				onSubmit={(values: LoginFormFields, actions) => {
					logInUser(values)
					setTimeout(() => {
						actions.setSubmitting(false)
					}, 400)
				}}
				validationSchema={UserSchema}
			>
				{(props: FormikProps<LoginFormFields>) => {
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
									<h1>Login</h1>
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
												? errors.password
												: ''
										}
										error={touched.password && errors.password ? true : false}
									/>
								</Grid>

								<Grid item xs={6}>
									<Button
										color="primary"
										type="submit"
										variant="contained"
										disabled={isSubmitting}
										className={classes.loginButton}
									>
										{' '}
                                        Log in
									</Button>
									{showFormStatus && (
										<div className="formStatus">
											<p className={classes.errorMessage}>
												{formStatus.message}
											</p>
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
	setUser,
	setAccounts
})(Login)