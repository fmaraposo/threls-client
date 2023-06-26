import { format, parseISO } from 'date-fns'

export const handleState = (events, event, setNewState, action) => {
	const newState = [...events]
	const index = newState.findIndex((e) => e.id === event.id)

	if (index === -1) {
		// Adding Event
		newState.push(event)
	} else {
		if (action === 'delete') {
			// Delete Event
			newState.splice(index, 1)
		} else {
			// Updating Event
			newState[index] = event
		}
	}

	console.log(index)
	console.log(newState)

	setNewState(newState)
	return newState
}

export const adjustTimeZone = (date) => {
	const timezoneOffset = parseISO(date).getTimezoneOffset()

	// Adjust the parsed date by adding the timezone offset
	const adjustedDate = new Date(parseISO(date).getTime() + timezoneOffset * 60 * 1000)

	return adjustedDate
}

export const formatTime = (date) => {
	const adjustedDate = adjustTimeZone(date)

	// Format the adjusted date
	const formattedTime = format(adjustedDate, 'HH:mm')

	return formattedTime
}
