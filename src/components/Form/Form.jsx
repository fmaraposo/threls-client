import React from 'react'
import { Modal, TextField, Button } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useForm, Controller } from 'react-hook-form'
import { TimePicker, LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { Cancel } from '@mui/icons-material'

const inputStyles = {
	margin: 1,
	width: '90%',
}

const FormModal = ({ openModal, setOpenModal }) => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm()
	const handleClose = () => setOpenModal(false)

	console.log('error', errors)

	const onSubmit = (data) => {
		console.log('Data To Submit', data)
	}

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
							{...register('eventTitle', { required: true })}
							error={Boolean(errors.eventTitle)}
							helperText={errors.eventTitle && 'Event Title is required'}
							label="Event Title"
							variant="outlined"
							sx={inputStyles}
						/>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<Controller
								name="eventDate"
								control={control}
								rules={{ required: true }}
								render={({ field: { onChange, value } }) => (
									<DatePicker
										label="Event Date"
										views={['year', 'month', 'day']}
										value={value}
										onChange={(date) => onChange(date)}
										sx={inputStyles}
										slotProps={{
											textField: {
												helperText: errors?.eventDate ? 'Event Date is required' : '',
											},
										}}
									/>
								)}
							/>
						</LocalizationProvider>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<Controller
								name="eventTime"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<TimePicker
										minutesStep={15}
										label="Event Time"
										value={field.value}
										onChange={(date) => field.onChange(date)}
										sx={inputStyles}
										slotProps={{
											textField: {
												helperText: errors?.eventTime ? 'Event Time is required' : '',
											},
										}}
									/>
								)}
							/>
						</LocalizationProvider>

						<TextField
							{...register('user', { required: true })}
							error={Boolean(errors.user)}
							helperText={errors.user && 'User is required'}
							defaultValue=""
							label="User"
							variant="outlined"
							sx={inputStyles}
						/>
						<TextField defaultValue="" label="Notes" variant="outlined" sx={inputStyles} />
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
