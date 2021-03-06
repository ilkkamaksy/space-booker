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

import { saveBooking } from '../../services/queries'

import { AppState } from '../../store/types'
import { Booking, BookingAttributesType } from '../../types'

import { startAction, addBooking } from '../../store/actions/bookings'

import { dateString } from '../../utils/helpers'

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

interface BookingFormFields {
  email: string
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
	updatingBookings: state.bookingData.updatingBookings,
})
  
type StateProps = ReturnType<typeof mapStateToProps>


interface Props {
	selectedSlot: BookingAttributesType|null
	handleCloseBookingForm: () => void
}

interface DispatchProps { 
	startAction: () => void
	addBooking: (booking:Booking) => void
}

const BookingForm = ({ 
	selectedSlot, 
	handleCloseBookingForm,
	updatingBookings,
	startAction,
	addBooking
}: StateProps & DispatchProps & Props):React.ReactElement => {

	const [formStatus, setFormStatus] = useState<FormStatus>({
		message: '',
		type: '',
	})
	const [showFormStatus, setShowFormStatus] = useState(false)
	const classes = stylesInUse()

	const AccountSchema = Yup.object().shape({
		email: Yup.string().required('Please enter your email.')
	})
    
	const saveMutation = useMutation(saveBooking, { 
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

	const saveBookingForm = (formData: BookingFormFields) => {
		
		if (!selectedSlot) {
			return
		}

		const date = selectedSlot.date ? selectedSlot.date : new Date()
		const timeStrParts = selectedSlot.time.split(':')
		date.setHours(parseInt(timeStrParts[0]))
		date.setMinutes(parseInt(timeStrParts[1]))

		const dateTime = date.toISOString()

		saveMutation.mutate({
			email: formData.email,
			date: dateString(date),
			dateTime: dateTime,
			slotNumber: selectedSlot.slotNumber,
			service_id: selectedSlot.service.id,
		})
	}

	useEffect(() => {
		
		const booking = saveMutation.data?.data
	
		if (
			saveMutation.isSuccess &&
			!saveMutation.isLoading && 
			booking && 
			updatingBookings
		) {
			addBooking(booking)
			handleCloseBookingForm()
		}

	}, [saveMutation, updatingBookings])
    
	return (
		<Formik
			initialValues={{
				email: '',
			}}
			onSubmit={(values: BookingFormFields, actions) => {
				saveBookingForm(values)
				setTimeout(() => {
					actions.setSubmitting(false)
				}, 400)
			}}
			validationSchema={AccountSchema}
		>
			{(props: FormikProps<BookingFormFields>) => {
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
									id="email"
									name="email"
									type="email"
									label="Your email"
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

							<Grid item className={classes.loginButton} xs={6}>
								<Button
									color="primary"
									type="submit"
									variant="contained"
									disabled={isSubmitting}
									className={classes.containedBtn}
								>
									{' '}
                                        Make booking
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
	addBooking
})(BookingForm)