import React, { useState } from 'react'
import FormModal from '../Form/Form'
import { AddCircle, EventAvailable } from '@mui/icons-material'
import { Tooltip, Button } from '@mui/material'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const CalendarComponent = ({ setDate, date }) => {
	const [openModal, setOpenModal] = useState(false)
	const handleChange = (e) => setDate(e)

	return (
		<div className="calendar">
			<div className="calendar__container">
				<div className="calendar__container__add">
					<Tooltip title="Add your event here">
						<AddCircle onClick={() => setOpenModal(true)} fontSize="large" color="primary" />
					</Tooltip>
					<Button type="submit" variant="contained" onClick={() => setOpenModal(true)}>
						<EventAvailable sx={{ marginRight: 1 }} />
						Add your Event
					</Button>
				</div>

				<main className="calendar__container__content">
					<Calendar
						onChange={handleChange}
						value={date}
						/* allowPartialRange={true}
						selectRange={true} */
					/>
				</main>
			</div>
			{openModal && <FormModal openModal={openModal} setOpenModal={setOpenModal} date={date}/>}
		</div>
	)
}

export default CalendarComponent
