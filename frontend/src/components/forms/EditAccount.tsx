import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
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

import { saveAccount } from '../../services/queries'

import { setAccounts, addAccount } from '../../store/actions/accounts'

import { AppState } from '../../store/types'
import { Account } from '../../types'

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

interface AccountFormFields {
  name: string
  siteUrl: string
  description: string
}

const formStatusProps: FormStatusProps = {
	error: {
		message: 'Invalid username or password. Please try again.',
		type: 'error',
	},
}

const mapStateToProps = (state: AppState) => ({
	accountdata: state.accountdata,
})
  
type Props = ReturnType<typeof mapStateToProps>

interface DispatchProps { 
    setAccounts: (accounts:Account[]) => void,
    addAccount: (account:Account) => void, 
}

const EditAccount = ({ accountdata, setAccounts, addAccount }: Props & DispatchProps):React.ReactElement => {
	const [formStatus, setFormStatus] = useState<FormStatus>({
		message: '',
		type: '',
	})
	const classes = stylesInUse()
	const [showFormStatus, setShowFormStatus] = useState(false)

	const AccountSchema = Yup.object().shape({
		name: Yup.string().required('Please enter the name of your organisation.'),
		siteUrl: Yup.string(),
		description: Yup.string(),
	})
    
	const mutation = useMutation(saveAccount, { 
		onError: () => {
			setFormStatus(formStatusProps.error)
			setShowFormStatus(true)
		}
	})

	const saveAccountData = async (accountData: AccountFormFields) => {
		mutation.mutate({
			name: accountData.name,
			siteUrl: accountData.siteUrl,
			description: accountData.description
		})
	}

	useEffect(() => {
		const newAccount = mutation.data?.data
		if (mutation.isSuccess && !mutation.isLoading && newAccount && !accountdata.accounts.find(acc => acc.id === newAccount.id)) {
			console.log('fired')
			addAccount(newAccount)
		}
	}, [mutation, accountdata])
    
	console.log('save', mutation, accountdata)

	return (
		<div className={classes.root}>
			<Formik
				initialValues={{
					name: '',
					siteUrl: '',
					description: ''
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
								<Grid item className={classes.title} xs={12}>
									<h1>Add account information</h1>
								</Grid>
								<Grid item className={classes.textField} xs={8}>
									<TextField
										id="name"
										name="name"
										type="text"
										label="Organisation name"
										value={values.name}
										onChange={handleChange}
										onBlur={handleBlur}
										helperText={
											touched.name && errors.name
												? errors.name
												: ''
										}
										error={touched.name && errors.name ? true : false}
									/>
								</Grid>

								<Grid item className={classes.textField} xs={8}>
									<TextField
										id="siteUrl"
										name="siteUrl"
										type="siteUrl"
										label="Website"
										value={values.siteUrl}
										onChange={handleChange}
										onBlur={handleBlur}
										helperText={
											touched.siteUrl && errors.siteUrl
												? errors.siteUrl
												: ''
										}
										error={touched.siteUrl && errors.siteUrl ? true : false}
									/>
								</Grid>

								<Grid item className={classes.textField} xs={8}>
									<TextField
										id="description"
										name="description"
										type="description"
										label="Description"
										value={values.description}
										onChange={handleChange}
										onBlur={handleBlur}
										helperText={
											touched.description && errors.description
												? errors.description
												: ''
										}
										error={touched.description && errors.description ? true : false}
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
                                        Save
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
	setAccounts,
	addAccount
})(EditAccount)