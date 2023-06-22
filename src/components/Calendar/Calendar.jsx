import React, { useState } from 'react'
import FormModal from '../Form/Form'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'

const CalendarComponent = () => {
	const [value, setValue] = useState(new Date())
	const [openModal, setOpenModal] = useState(false)

	return (
		<div className="calendar">
			<header>
				<h1>Set your event here</h1>
			</header>
			<div className="calendar__container">
				<main className="calendar__container__content">
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DateCalendar
							value={value}
							onChange={(newValue) => {
                setOpenModal(true)
                setValue(newValue)
              }}
						/>
					</LocalizationProvider>
				</main>
			</div>
			{openModal && (
				<FormModal openModal={openModal} setOpenModal={setOpenModal} />
			)}
		</div>
	)
}

export default CalendarComponent
