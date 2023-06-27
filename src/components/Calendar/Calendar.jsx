import React from 'react'
import FormModal from '../Form/Form'
import { AddCircle, EventAvailable } from '@mui/icons-material'
import { Tooltip, Button } from '@mui/material'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const CalendarComponent = ({
	setDate,
	date,
	setEvents,
	events,
	openModal,
	setOpenModal,
	editEvent,
	setEditEvent,
	setError,
}) => {
	const handleChange = (e) => {
		e.setHours(new Date(e).getHours())
		e.setMinutes(new Date(e).getMinutes() - new Date().getTimezoneOffset())
		e.setSeconds(0)
		setDate(e)
	}

	return (
		<div className="calendar">
			<div className="calendar__container">
				<div className="calendar__container__add">
					<Tooltip title="Add your event here">
						<AddCircle onClick={() => setOpenModal(true)} fontSize="large" color="primary" />
					</Tooltip>
					<Button
						type="submit"
						variant="contained"
						sx={{
							backgroundColor: '#4D24ED',
							'&:hover': {
								backgroundColor: 'rgba(77, 36, 237, 0.7)',
							},
						}}
						onClick={() => setOpenModal(true)}
					>
						<EventAvailable sx={{ marginRight: 1 }} />
						Add your Event
					</Button>
				</div>

				<main className="calendar__container__content">
					<Calendar onChange={handleChange} value={date} />

					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<MobileDatePicker onChange={handleChange} value={date} format={'dd/MM/yyyy'} />
					</LocalizationProvider>
				</main>
			</div>
			{openModal && (
				<FormModal
					openModal={openModal}
					setOpenModal={setOpenModal}
					date={date}
					events={events}
					setEvents={setEvents}
					setEditEvent={setEditEvent}
					editEvent={editEvent}
					setError={setError}
				/>
			)}
		</div>
	)
}

export default CalendarComponent
