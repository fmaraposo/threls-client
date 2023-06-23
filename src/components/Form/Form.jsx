import React from 'react'
import { Modal, TextField, Button } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useForm, Controller } from 'react-hook-form'
import { TimePicker, LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { Cancel } from '@mui/icons-material'

const inputStyles = {
	margin: 1,
	width: '95%',
}

const FormModal = ({ openModal, setOpenModal, date }) => {
	const defaultStartTime = new Date().setHours(8, 0, 0, 0) // this comes as UNIX timestamp
	const defaultEndTime = new Date().setHours(17, 0, 0, 0) // this comes as UNIX timestamp
	const dateFormat = 'dd/MM/yyyy'

	const {
		register,
		handleSubmit,
		control,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			startDate: date,
			endDate: date,
			startTime: defaultStartTime,
			endTime: defaultEndTime,
			title: '',
			notes: '',
		},
	})

	const handleClose = () => setOpenModal(false)
	const onSubmit = (data) => {
		const { startDate, endDate, startTime, endTime, ...restData } = data

		const formatDate = (date, time) => {
			let formatTime
			// start or end  time has been changed on the form the value is an instance of date object
			if (time instanceof Date) formatTime = time
			// start or end  time has not been changed on the form the value is an UNIX timestamp
			else formatTime = new Date(time)

			return new Date(
				date.getFullYear(),
				date.getMonth(),
				date.getUTCDate(),
				formatTime.getHours(),
				formatTime.getMinutes(),
				0
			)
		}

		const formData = {
			startDate: formatDate(startDate, startTime),
			endDate: formatDate(endDate, endTime),
			...restData,
		}

		console.log('Data To Submit', formData)
	}

	// TODO - Validation so from date is before to date

	return (
		<Modal open={openModal} onClose={handleClose}>
			<div className="model-dialog">
				<div className="modal-header">
					<button onClick={handleClose} className="close">
						<Cancel />
					</button>
					<h3>Add your event</h3>
				</div>
				<div className="modal-body">
					<form onSubmit={handleSubmit(onSubmit)}>
						<TextField
							defaultValue=""
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
											value={value || defaultStartTime}
											onChange={(date) => onChange(date)}
											sx={{ ...inputStyles, width: '50%' }}
											slotProps={{
												textField: {
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
											sx={inputStyles}
											slotProps={{
												textField: {
													helperText: errors?.endDate ? 'To Date is required' : '',
												},
											}}
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
												label="To"
												value={value || defaultEndTime}
												onChange={(date) => onChange(date)}
												sx={inputStyles}
												slotProps={{
													textField: {
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
						<Button type="submit" variant="contained" sx={inputStyles}>
							Submit
						</Button>
					</form>
				</div>
			</div>
		</Modal>
	)
}

export default FormModal
