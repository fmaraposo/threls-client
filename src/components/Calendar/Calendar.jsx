import React, { useState } from 'react'
import FormModal from '../Form/Form'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import { AddCircle } from '@mui/icons-material'
import { Tooltip } from '@mui/material'

const CustomActionBar = () => {
	return null
}

const CalendarComponent = () => {
	const [value, setValue] = useState(new Date())
	const [openModal, setOpenModal] = useState(false)

	return (
		<div className="calendar">
			<div className="calendar__container">
				<div className="calendar__container__add">
					<Tooltip title="Add your event here">
						<AddCircle onClick={() => setOpenModal(true)} fontSize="large" color="primary" />
					</Tooltip>
				</div>

				<main className="calendar__container__content">
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<StaticDatePicker
							value={value}
							onChange={(newValue) => {
								setValue(newValue)
								setOpenModal(true)
							}}
							slots={{ actionBar: CustomActionBar }}
						/>
					</LocalizationProvider>
				</main>
			</div>
			{openModal && <FormModal openModal={openModal} setOpenModal={setOpenModal} />}
		</div>
	)
}

export default CalendarComponent
