export const handleState = (events, event, setNewState, action) => {
	const newState = [...events]
	const index = newState.findIndex((event) => event.id === event.id)
	if (index !== -1) {
		if (action === 'delete') newState.splice(index, 1)
		else newState.push(event)
	} else {
		// Updating Event
		newState[index] = event
	}

	setNewState(newState)
	return newState
}
