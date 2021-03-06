import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory, Redirect } from 'react-router-dom'
import { useMutation } from 'react-query'
import * as Yup from 'yup'
import { Formik, Form, FormikProps, Field } from 'formik'
import {
	Grid,
	TextField,
	Button,
	makeStyles,
	createStyles,
} from '@material-ui/core'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

import { TimePicker } from 'formik-material-ui-pickers'

import DateFnsUtils from '@date-io/date-fns'

import { 
	saveService, 
	updateService, 
	deleteService, 
} from '../../services/queries'

import { startAction, setSingleAccount } from '../../store/actions/accounts'
import { removeBooking, resetBookings } from '../../store/actions/bookings'

import { AppState } from '../../store/types'
import { Service, Account, Booking } from '../../types'


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
		formColumn: {
			
		},
		textField: {
			margin: '5px 0 30px',
			'& > *': {
				width: '100%',
			},
		},
		textAreaField: {
			height: '100px',
			width: '97%',
			lineHeight: '22px',
			display: 'block',
			margin: '5px 0 40px',
			padding: '15px',
			fontFamily: 'Roboto, Helvetica, Arial, sans-serif'
		},
		dateField: {
			margin: '5px 0 20px',
		},
		submitButton: {
			marginTop: '0',
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
    startTime: Date
    endTime: Date
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
	bookingData: state.bookingData,
})
  
type StateProps = ReturnType<typeof mapStateToProps>

interface DispatchProps { 
	setSingleAccount: (account:Account) => void
	startAction: () => void
	removeBooking: (data:Booking) => void
	resetBookings: () => void
}

interface Props {
	serviceToEdit: Service|undefined,
    account: Account|undefined
}

const EditService = ({ 
	accountdata, 
	bookingData,
	serviceToEdit, 
	startAction, 
	setSingleAccount,
	removeBooking,
	resetBookings,
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

	const deleteMutation = useMutation(deleteService)

	const handleDelete = (service:Service) => {
		if (!account) {
			return
		}
		deleteMutation.mutate(service)

		const serviceBookings = bookingData.bookings.filter(booking => booking.service?.id === service.id)
		serviceBookings.forEach(booking => removeBooking(booking))

		const newAccount = {
			...account,
			services: account.services.filter(ser => ser.id !== service.id)
		}
		setSingleAccount(newAccount)

		history.push(`/account/${account?.id}/manage`)
		
	}

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
				startTime: `${data.startTime.getHours()}:${data.startTime.getMinutes()}`,
				endTime: `${data.endTime.getHours()}:${data.endTime.getMinutes()}`,
				timeSlotLen: data.timeSlotLen,
				account_id: account.id
			})
		} else {
			saveMutation.mutate({
				name: data.name,
				description: data.description,
				maxBookings: data.maxBookings,
				startTime: `${data.startTime.getHours()}:${data.startTime.getMinutes()}`,
				endTime: `${data.endTime.getHours()}:${data.endTime.getMinutes()}`,
				timeSlotLen: data.timeSlotLen,
				account_id: account.id
			})
		}
	}

	useEffect(() => {
		
		const newService = saveMutation.data?.data
	
		if (
			saveMutation.isSuccess &&
			!saveMutation.isLoading && 
			newService && 
			account &&
			accountdata.updatingAccounts
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
			accountdata.updatingAccounts
		) {
			const updatedAccount = {
				...account,
				services: account.services.map(service => service.id === updatedService.id ? updatedService : service)
			}
			setSingleAccount(updatedAccount)
			resetBookings()
			setRedirect(true)
		}		

	}, [saveMutation, updateMutation, accountdata])  

	const defaultStartTime = new Date()
	defaultStartTime.setHours(9)
	defaultStartTime.setMinutes(0)

	const defaultEndTime = new Date()
	defaultEndTime.setHours(17)
	defaultEndTime.setMinutes(0)

	const timeStrToDate = (timeStr:string):Date => {
		const date = new Date()
		const timeStrParts = timeStr.split(':')
		date.setHours(parseInt(timeStrParts[0]))
		date.setMinutes(parseInt(timeStrParts[1]))
		return date
	}

	if (redirect) {
		return <Redirect to={account ? `/account/${account.id}/manage/` : '/dashboard'} />
	}

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Formik
				initialValues={{
					name: serviceToEdit ? serviceToEdit.name : '',
					description: serviceToEdit ? serviceToEdit.description : '',
					maxBookings: serviceToEdit ? serviceToEdit.maxBookings : 1,
					startTime: serviceToEdit ? timeStrToDate(serviceToEdit.startTime) : defaultStartTime,
					endTime: serviceToEdit ? timeStrToDate(serviceToEdit.endTime) : defaultEndTime,
					timeSlotLen: serviceToEdit ? serviceToEdit.timeSlotLen : 30,
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
								<Grid item className={classes.formColumn} xs={8}>
									<TextField
										id="name"
										name="name"
										type="text"
										label="Space name"
										variant="outlined"
										fullWidth
										value={values.name}
										className={classes.textField}
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
							</Grid>
							
							<Grid container direction="row">
								<Grid item className={classes.formColumn} xs={8}>
									<label htmlFor={'description'}>Description</label>
									<Field
										id="description"
										name="description"
										label="Description"
										placeholder="Write a short description here..."
										component="textarea"
										rowsMin={6}
										className={classes.textAreaField}
										value={values.description}
										onChange={handleChange}
									/>
								</Grid>
							</Grid>

							<Grid container direction="row">
								<Grid item className={classes.formColumn} xs={2}>

								
									<Field 
										component={TimePicker} 
										id="startTime"
										name="startTime"
										label="Start time"
										className={classes.dateField}
										value={values.startTime}
										ampm={false}
										autoOk={true}
										minutesStep={5}
									/>

								</Grid>

								<Grid item className={classes.formColumn} xs={2}>

									<Field 
										component={TimePicker} 
										id="endTime"
										name="endTime"
										label="End time"
										className={classes.dateField}
										value={values.endTime}
										ampm={false}
										autoOk={true}
										minutesStep={5}
									/>
									
								</Grid>
							

								<Grid item className={classes.formColumn} xs={2}>
									<TextField
										id="timeSlotLen"
										name="timeSlotLen"
										type="number"
										label="Timeslot (i.e. 30 mins)"
										variant="outlined"
										className={classes.textField}
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

								<Grid item className={classes.formColumn} xs={2}>
									<TextField
										id="maxBookings"
										name="maxBookings"
										type="number"
										label="Max bookings per timeslot"
										variant="outlined"
										className={classes.textField}
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
							</Grid>
							
							<Grid container direction="row">
								<Grid item className={classes.submitButton} xs={6}>
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
										onClick={() => history.goBack()}
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

			{serviceToEdit && 
			<div className={classes.dangerZone}>
				<h2>Danger Zone</h2>
				<p>Be careful here, deleting the service will wipe out all data and bookings related to it.</p>
				<Button
					color="primary"
					variant="outlined"
					className={classes.deleteBtn}
					onClick={() => handleDelete(serviceToEdit)}
				>
					{' '}
								Delete service
				</Button>
			</div>
				
			}
			
		</MuiPickersUtilsProvider>
	)
}

export default connect(mapStateToProps, {
	startAction,
	setSingleAccount,
	removeBooking,
	resetBookings
})(EditService)