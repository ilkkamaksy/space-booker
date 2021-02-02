import React, { useState, useEffect } from 'react'
import { useMutation } from 'react-query'
import { Formik, Form, FormikProps } from 'formik'
import {
	Grid,
	TextField,
	Button,
	makeStyles,
	createStyles,
} from '@material-ui/core'
import { register } from '../../services/queries'

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
			maxWidth: '500px',
			display: 'block',
			margin: '0 auto',
		},
		textField: {
			'& > *': {
				width: '100%',
			},
		},
		registerButton: {
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
		message: 'Registeration failed: username already exists.',
		type: 'error',
	},
}

const Register = ():React.ReactElement => {
	const [formStatus, setFormStatus] = useState<FormStatus>({
		message: '',
		type: '',
	})
	const classes = stylesInUse()
	const [showFormStatus, setShowFormStatus] = useState(false)
    
	const mutation = useMutation(register)

	const createNewAccount = async (userData: UserData) => {
		mutation.mutate({
			username: userData.username,
			email: userData.email,
			password: userData.password
		})
	}
    
	useEffect(() => {
		if (mutation.isSuccess) {
			setFormStatus(formStatusProps.success)
			setShowFormStatus(true)
		}
    
		if (mutation.isError) {
			setFormStatus(formStatusProps.duplicate)
			setShowFormStatus(true)
		}
	}, [mutation.isSuccess, mutation.isError])
	

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
						<Form>
							<Grid container direction="row">
								<Grid item className={classes.title} xs={12}>
									<h1>Sign up!</h1>
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
									{' '}
									<TextField
										id="email"
										name="email"
										type="text"
										label="Email"
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
												? 'Make sure your password is minimum of 8 characters long and consists of at least 1 uppercase, lowercase, number and one special ' +
                          'character from !?@#$%^&*(). Password cannot end with an empty space.'
												: ''
										}
										error={touched.password && errors.password ? true : false}
									/>
								</Grid>

								<Grid item className={classes.textField} xs={8}>
									<TextField
										id="confirmPassword"
										name="confirmPassword"
										type="password"
										label="Confirm password"
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

								<Grid item className={classes.registerButton} xs={6}>
									<Button
										color="primary"
										type="submit"
										variant="contained"
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

export default Register
