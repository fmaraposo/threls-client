import { Box } from '@mui/material'
import Calendar from './components/Calendar/Calendar'
import Events from './components/Events/EventsList'
import './App.css'

function App() {
	return (
		<>
			<Box className="app-container">
				<Events />
				<Calendar />
			</Box>
		</>
	)
}

export default App
