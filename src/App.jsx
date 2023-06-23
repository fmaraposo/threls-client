import { useState } from 'react'
import { Box } from '@mui/material'
import Calendar from './components/Calendar/Calendar'
import Events from './components/Events/EventsList'
import './App.css'

function App() {
	const [date, setDate] = useState(new Date())

	return (
		<>
			<Box className="app-container">
				<Events date={date}/>
				<Calendar setDate={setDate} date={date} />
			</Box>
		</>
	)
}

export default App
