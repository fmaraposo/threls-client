const apiURL = 'http://localhost:3000/api'

const createRequest = async (url = '', method, data = null) => {
	let fetchParms = {
		method: method,
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	}

	if (data) {
		fetchParms.body = JSON.stringify(data)
	}

	const response = await fetch(url, fetchParms)

	return response.json()
}

export const getAllEvents = async () => await createRequest(apiURL + '', 'GET')

export const getEventsOfToday = async (date) => {
	const timezoneOffset = new Date(date).getTimezoneOffset()

	// Handle Timezone
	const dateToFetch = new Date(date)
	dateToFetch.setHours(0)
	dateToFetch.setMinutes(0 - timezoneOffset)
	dateToFetch.setSeconds(0)

	const response = await createRequest(apiURL + `/${dateToFetch.toISOString()}`, 'GET')
	return response
}

export const saveEvent = async (data) => {
	const response = await createRequest(apiURL + '/saveEvent', 'POST', data)
	return response
}

export const deleteEvent = async (id) => {
	const response = await createRequest(apiURL + `/deleteEvent/${id}`, 'DELETE')
	return response
}
