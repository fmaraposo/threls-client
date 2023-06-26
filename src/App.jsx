import { useState } from 'react'
import { Box } from '@mui/material'
import Calendar from './components/Calendar/Calendar'
import Events from './components/Events/EventsList'
import threlsLogo from './assets/threls.svg'
import './App.css'

function App() {
	const [date, setDate] = useState(new Date())
	const [events, setEvents] = useState([])
	const [editEvent, setEditEvent] = useState(null)
	const [openModal, setOpenModal] = useState(false)

	return (
		<>
			<img src={threlsLogo} alt="threls logo" className="logo" width={'15%'} />
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
				/>
			</Box>
		</>
	)
}

export default App
