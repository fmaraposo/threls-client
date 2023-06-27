import { useState, useEffect } from 'react'
import { Box, Alert, Collapse } from '@mui/material'
import { Cancel, WarningAmber } from '@mui/icons-material'
import Calendar from './components/Calendar/Calendar'
import Events from './components/Events/EventsList'
import threlsLogo from './assets/threls.svg'
import { styled } from '@mui/system'
import './App.css'

const StyledIcon = styled(WarningAmber)`
	color: #ffffff; /* Customize the color */
`

function App() {
	const [date, setDate] = useState(new Date())
	const [events, setEvents] = useState([])
	const [editEvent, setEditEvent] = useState(null)
	const [openModal, setOpenModal] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		if (error) {
			// Auto close error message after 3 seconds
			const autoCloseError = () => setTimeout(() => setError(null), 3000)
			autoCloseError()
		}
	}, [error])

	return (
		<>
			<img src={threlsLogo} alt="threls logo" className="logo" />
			{error && (
				<Collapse in={error}>
					<Alert
						icon={<StyledIcon />}
						severity="error"
						className="alert"
						action={<Cancel onClick={() => setError(null)} sx={{ cursor: 'pointer' }} />}
					>
						{error}
					</Alert>
				</Collapse>
			)}
			<Box className="app-container">
				<Events
					date={date}
					events={events}
					setEvents={setEvents}
					setOpenModal={setOpenModal}
					setEditEvent={setEditEvent}
				/>
				<Calendar
					setDate={setDate}
					date={date}
					events={events}
					setEvents={setEvents}
					openModal={openModal}
					setOpenModal={setOpenModal}
					editEvent={editEvent}
					setEditEvent={setEditEvent}
					setError={setError}
				/>
			</Box>
		</>
	)
}

export default App
