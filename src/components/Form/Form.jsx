import React from 'react'
import { Modal, TextField, Button } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useForm, Controller } from 'react-hook-form'
import { TimePicker, LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { parseISO, isAfter, isEqual } from 'date-fns'
import { Cancel } from '@mui/icons-material'
import { saveEvent, updateEvent } from '../../utils/RequestFunctions'
import { handleState, adjustTimeZone } from '../../utils/GlobalFunctions'

const inputStyles = {
	margin: 1,
	width: '95%',
}

const FormModal = ({
	openModal,
	setOpenModal,
	date,
	setEvents,
	events,
	editEvent,
	setEditEvent,
	setError,
}) => {
	// set the default start and end time, result comes in UNIX timestamp
	const defaultStartTime = new Date().setHours(8, 0, 0, 0)
	const defaultEndTime = new Date().setHours(17, 0, 0, 0)
	const dateFormat = 'dd/MM/yyyy'

	const {
		register,
		handleSubmit,
		control,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			startDate: editEvent ? parseISO(editEvent.startDate) : date,
			endDate: editEvent ? parseISO(editEvent.endDate) : date,
			startTime: editEvent ? adjustTimeZone(editEvent.startDate) : defaultStartTime,
			endTime: editEvent ? adjustTimeZone(editEvent.endDate) : defaultEndTime,
			title: editEvent?.title || '',
			notes: editEvent?.notes || '',
		},
	})

	const handleClose = () => {
		if (editEvent) setEditEvent(null)
		setOpenModal(false)
	}

	const onSubmit = async (data) => {
		const { startDate, endDate, startTime, endTime, ...restData } = data

		// Get the user's local timezone offset in minutes
		const timezoneOffset = new Date().getTimezoneOffset()

		// Convert startTime and endTime to local time
		const startDateTime = new Date(startDate)
		startDateTime.setHours(new Date(startTime).getHours())
		startDateTime.setMinutes(new Date(startTime).getMinutes() - timezoneOffset)
		startDateTime.setSeconds(0)

		const endDateTime = new Date(endDate)
		endDateTime.setHours(new Date(endTime).getHours())
		endDateTime.setMinutes(new Date(endTime).getMinutes() - timezoneOffset)
		endDateTime.setSeconds(0)

		// Create the formData object with adjusted startDate and endDate
		const formData = {
			startDate: startDateTime.toISOString(),
			endDate: endDateTime.toISOString(),
			...restData,
		}

		let eventSaved

		if (editEvent) {
			// Handle here if the event is being edited
			eventSaved = await updateEvent(formData, editEvent._id)
			setEditEvent(null) // reset the state
		} else {
			eventSaved = await saveEvent(formData)
		}

		if (eventSaved.error) {
			setTimeout(() => setOpenModal(false), 500)
			setError(eventSaved.error)
		} else {
			handleState(events, eventSaved.event, setEvents)
			// To prevent the modal from closing immediately after submitting
			setTimeout(() => setOpenModal(false), 1000)
		}
	}

	return (
		<Modal open={openModal} onClose={handleClose}>
			<div className="model-dialog">
				<div className="modal-header">
					<button onClick={handleClose} className="close">
						<Cancel />
					</button>
					<h3>{editEvent ? 'Edit your event' : 'Add your event'}</h3>
				</div>
				<div className="modal-body">
					<form onSubmit={handleSubmit(onSubmit)}>
						<TextField
							{...register('title', { required: true })}
							error={Boolean(errors.eventTitle)}
							helperText={errors.title && 'Event Title is required'}
							label="Title"
							variant="outlined"
							sx={inputStyles}
						/>
						<div className="eventDate start">
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<Controller
									name="startDate"
									control={control}
									rules={{ required: true }}
									render={({ field: { onChange, value } }) => (
										<DatePicker
											format={dateFormat}
											label="From"
											maxDate={watch('endDate')}
											value={value || date}
											onChange={(date) => onChange(date)}
											sx={{ ...inputStyles, width: '50%' }}
											slotProps={{
												textField: {
													helperText: errors?.startDate ? 'Start Date is required' : '',
												},
											}}
										/>
									)}
								/>
								<Controller
									name="startTime"
									control={control}
									rules={{ required: true }}
									render={({ field: { onChange, value } }) => (
										<TimePicker
											timeSteps={{ hours: 1, minutes: 15, seconds: 0 }}
											minutesStep={15}
											label="From"
											ampm={false}
											maxTime={watch('endTime')}
											value={value || defaultStartTime}
											onChange={(date) => onChange(date)}
											sx={{ ...inputStyles, width: '50%' }}
											slotProps={{
												textField: {
													readOnly: true,
													helperText: errors?.startTime ? 'Start Time is required' : '',
												},
											}}
										/>
									)}
								/>
							</LocalizationProvider>
						</div>
						<div className="eventDate end">
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<Controller
									name="endDate"
									control={control}
									rules={{ required: true }}
									render={({ field: { onChange, value } }) => (
										<DatePicker
											format={dateFormat}
											label="To"
											minDate={watch('startDate')}
											value={value || date}
											onChange={(date) => onChange(date)}
											slotProps={{
												textField: {
													readOnly: true,
													helperText: errors?.endDate ? 'To Date is required' : '',
												},
											}}
											sx={inputStyles}
										/>
									)}
								/>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<Controller
										name="endTime"
										control={control}
										rules={{ required: true }}
										render={({ field: { onChange, value } }) => (
											<TimePicker
												timeSteps={{ hours: 1, minutes: 15 }}
												minutesStep={15}
												minTime={watch('startTime')}
												label="To"
												ampm={false}
												value={value || defaultEndTime}
												onChange={(date) => onChange(date)}
												sx={inputStyles}
												slotProps={{
													textField: {
														readOnly: true,
														helperText: errors?.endTime ? 'End Time is required' : '',
													},
												}}
											/>
										)}
									/>
								</LocalizationProvider>
							</LocalizationProvider>
						</div>
						<TextField
							defaultValue=""
							label="Notes"
							variant="outlined"
							sx={inputStyles}
							name="notes"
							{...register('notes')}
						/>
						<Button
							type="submit"
							variant="contained"
							sx={{
								...inputStyles,
								backgroundColor: '#4D24ED',
								'&:hover': {
									backgroundColor: 'rgba(77, 36, 237, 0.7)',
								},
							}}
						>
							Submit
						</Button>
					</form>
				</div>
			</div>
		</Modal>
	)
}

export default FormModal
