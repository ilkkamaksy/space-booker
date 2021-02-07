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

import { setToken, setUser } from '../../store/actions/user'

import { login } from '../../services/queries'

const stylesInUse = makeStyles((theme) =>
	createStyles({
		root: {
			maxWidth: '500px',
			display: 'block',
			margin: '0 auto',
		},
		textField: {
			'& > *': {
				width: '100%',
			},
		},
		loginButton: {
			marginTop: '30px',
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
    setToken: (token:string) => void, 
}

const Login = ({ user, setToken }: Props & DispatchProps):React.ReactElement => {
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
		}
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
						<Form>
							<Grid container direction="row">
								<Grid item className={classes.title} xs={12}>
									<h1>Login</h1>
								</Grid>
								<Grid item className={classes.textField} xs={8}>
									<TextField
										id="username"
										name="username"
										type="text"
										label="Username"
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
									<TextField
										id="password"
										name="password"
										type="password"
										label="Password"
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

								<Grid item className={classes.loginButton} xs={6}>
									<Button
										color="primary"
										type="submit"
										variant="contained"
										disabled={isSubmitting}
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
	setUser
})(Login)