import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory, Redirect } from 'react-router-dom'
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

import { saveService, updateService } from '../../services/queries'

import { startAction, setSingleAccount } from '../../store/actions/accounts'

import { AppState } from '../../store/types'
import { Service, Account } from '../../types'

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

interface SpaceFormFields {
    name: string
    description: string
    maxBookings: number
    startTime: string
    endTime: string
    timeSlotLen: number
}

const formStatusProps: FormStatusProps = {
	error: {
		message: 'Something went wrong. Please try again.',
		type: 'error',
	},
	success: {
		message: 'Space details saved!',
		type: 'success',
	},
}

const mapStateToProps = (state: AppState) => ({
	accountdata: state.accountdata,
})
  
type StateProps = ReturnType<typeof mapStateToProps>

interface DispatchProps { 
	setSingleAccount: (account:Account) => void,
	startAction: () => void
}

interface Props {
	serviceToEdit: Service|undefined,
    account: Account|undefined
}

const EditService = ({ 
	accountdata, 
	serviceToEdit, 
	startAction, 
	setSingleAccount,
	account, 
}: StateProps & DispatchProps & Props):React.ReactElement => {

	const history = useHistory()

	const [formStatus, setFormStatus] = useState<FormStatus>({
		message: '',
		type: '',
	})
	const classes = stylesInUse()
	const [showFormStatus, setShowFormStatus] = useState(false)
	const [redirect, setRedirect] = useState(false)

	const SpaceSchema = Yup.object().shape({
		name: Yup.string().required('Please enter the name for the space.'),
		description: Yup.string(),
		maxBookings: Yup.number().required('Please enter maximum number of bookings'),
		startTime: Yup.string().required('Please enter starting time'),
		endTime: Yup.string().required('Please enter ending time.'),
		timeSlotLen: Yup.number().required('Please enter time slot length.'),
	})
    
	const saveMutation = useMutation(saveService, { 
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

	const updateMutation = useMutation(updateService, { 
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

	const saveServiceData = async (data: SpaceFormFields) => {
		if (!account) {
			return
		}
		if (serviceToEdit) {
			updateMutation.mutate({
				id: serviceToEdit.id,
				name: data.name,
				description: data.description,
				maxBookings: data.maxBookings,
				startTime: data.startTime,
				endTime: data.endTime,
				timeSlotLen: data.timeSlotLen,
				account_id: account.id
			})
		} else {
			saveMutation.mutate({
				name: data.name,
				description: data.description,
				maxBookings: data.maxBookings,
				startTime: data.startTime,
				endTime: data.endTime,
				timeSlotLen: data.timeSlotLen,
				account_id: account.id
			})
		}
	}

	console.log(account, saveMutation)

	useEffect(() => {
		
		const newService = saveMutation.data?.data
	
		if (
			saveMutation.isSuccess &&
			!saveMutation.isLoading && 
			newService && 
			account &&
			accountdata.updating
		) {
			const updatedAccount = {
				...account,
				services: [newService, ...account.services]
			}
			setSingleAccount(updatedAccount)
			setRedirect(true)
		}

		const updatedService = updateMutation.data?.data

		if (
			updateMutation.isSuccess &&
			!updateMutation.isLoading &&
			updatedService &&
			account &&
			accountdata.updating
		) {
			const updatedAccount = {
				...account,
				services: account.services.map(service => service.id === updatedService.id ? updatedService : service)
			}
			setSingleAccount(updatedAccount)
			setRedirect(true)
		}		

	}, [saveMutation, updateMutation, accountdata])

	const handleClick = (path: string) => {
		return () => {
			history.push(path)
		}
	}    

	if (redirect) {
		return <Redirect to={account ? `/account/${account.id}/services/` : '/dashboard'} />
	}

	return (
		<Formik
			initialValues={{
				name: serviceToEdit ? serviceToEdit.name : '',
				description: serviceToEdit ? serviceToEdit.description : '',
				maxBookings: serviceToEdit ? serviceToEdit.maxBookings : '',
				startTime: serviceToEdit ? serviceToEdit.startTime : '',
				endTime: serviceToEdit ? serviceToEdit.endTime : '',
				timeSlotLen: serviceToEdit ? serviceToEdit.timeSlotLen : '',
			}}
			onSubmit={(values: SpaceFormFields, actions) => {
				saveServiceData(values)
				setTimeout(() => {
					actions.setSubmitting(false)
				}, 400)
			}}
			validationSchema={SpaceSchema}
		>
			{(props: FormikProps<SpaceFormFields>) => {
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
									label="Space name"
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
									id="description"
									name="description"
									type="text"
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

							<Grid item className={classes.textField} xs={8}>
								<TextField
									id="maxBookings"
									name="maxBookings"
									type="number"
									label="Max bookings"
									value={values.maxBookings}
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

							<Grid item className={classes.textField} xs={8}>
								<TextField
									id="startTime"
									name="startTime"
									type="text"
									label="Start time"
									value={values.startTime}
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

							<Grid item className={classes.textField} xs={8}>
								<TextField
									id="endTime"
									name="endTime"
									type="text"
									label="End time"
									value={values.endTime}
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

							<Grid item className={classes.textField} xs={8}>
								<TextField
									id="timeSlotLen"
									name="timeSlotLen"
									type="number"
									label="Time slot (i.e. 30 mins, 60 mins, etc.)"
									value={values.timeSlotLen}
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
									onClick={handleClick(account ? `/account/${account.id}/services/` : '/dashboard')}
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
	startAction,
	setSingleAccount
})(EditService)