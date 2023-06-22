import * as React from 'react'
import { Modal, TextField } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import {
	TimePicker,
	LocalizationProvider,
	DatePicker,
} from '@mui/x-date-pickers'

const inputStyles = {
	margin: 1,
	width: '90%',
}

const FormModal = ({ openModal, setOpenModal }) => {
	const handleClose = () => setOpenModal(false)

	return (
		<Modal open={openModal} onClose={handleClose}>
			<div className="model-dialog">
				<div className="modal-header">
					<button onClick={handleClose} className="close">
						x
					</button>
					<h3>Add your event</h3>
				</div>
				<div className="modal-body">
					<TextField
						defaultValue=""
						label="Event Title"
						variant="standard"
						sx={inputStyles}
					/>
					<div className="date-pickers">
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker label="Basic date picker" sx={{ ...inputStyles, width: '45%' }} />
						</LocalizationProvider>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<TimePicker label="Basic time picker" sx={{ ...inputStyles, width: '42%' }}/>
						</LocalizationProvider>
					</div>
					<TextField
						defaultValue=""
						label="User"
						variant="standard"
						sx={inputStyles}
					/>
					<TextField
						defaultValue=""
						label="Notes"
						variant="standard"
						sx={inputStyles}
					/>
				</div>
			</div>
		</Modal>
	)
}

export default FormModal
