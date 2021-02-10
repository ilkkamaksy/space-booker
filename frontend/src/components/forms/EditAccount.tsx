import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
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

import { saveAccount, updateAccount } from '../../services/queries'

import { setAccounts, addAccount, startAction, setSingleAccount } from '../../store/actions/accounts'

import { AppState } from '../../store/types'
import { Account } from '../../types'

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
		message: 'Something went wrong. Please try again.',
		type: 'error',
	},
	success: {
		message: 'Organisation details saved!',
		type: 'success',
	},
}

const mapStateToProps = (state: AppState) => ({
	accountdata: state.accountdata,
})
  
type StateProps = ReturnType<typeof mapStateToProps>

interface DispatchProps { 
	addAccount: (account:Account) => void, 
	setSingleAccount: (account:Account) => void,
	startAction: () => void
}

interface Props {
	accountToEdit: Account|undefined
}

const EditAccount = ({ accountdata, addAccount, accountToEdit, startAction, setSingleAccount }: StateProps & DispatchProps & Props):React.ReactElement => {

	const history = useHistory()

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
    
	const saveMutation = useMutation(saveAccount, { 
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

	const updateMutation = useMutation(updateAccount, { 
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
				id: accountToEdit.id,
				name: accountData.name,
				siteUrl: accountData.siteUrl,
				description: accountData.description,
				services: accountToEdit.services
			})
		} else {
			saveMutation.mutate({
				name: accountData.name,
				siteUrl: accountData.siteUrl,
				description: accountData.description
			})
		}
	}

	useEffect(() => {
		
		const newAccount = saveMutation.data?.data
	
		if (
			saveMutation.isSuccess &&
			!saveMutation.isLoading && 
			newAccount && 
			accountdata.updating
		) {
			addAccount(newAccount)
		}

		const updatedAccount = updateMutation.data?.data
		if (
			updateMutation.isSuccess &&
			!updateMutation.isLoading &&
			updatedAccount &&
			accountdata.updating
		) {
			setSingleAccount(updatedAccount)
		}		

	}, [saveMutation, updateMutation, accountdata])

	const handleClick = (path: string) => {
		return () => {
			history.push(path)
		}
	}    
	
	return (
		<Formik
			initialValues={{
				name: accountToEdit ? accountToEdit.name : '',
				siteUrl: accountToEdit ? accountToEdit.siteUrl : '',
				description: accountToEdit ? accountToEdit.description : ''
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
									className={classes.containedBtn}
								>
									{' '}
                                        Save
								</Button>

								<Button
									color="primary"
									variant="outlined"
									className={classes.outlinedBtn}
									onClick={handleClick('/dashboard')}
								>
									{' '}
                            Cancel
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
	)
}

export default connect(mapStateToProps, {
	setAccounts,
	addAccount,
	startAction,
	setSingleAccount
})(EditAccount)