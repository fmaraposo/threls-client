let apiURL = 'http://localhost:3000/api'

if (window.location.hostname === 'calendarapplication.netlify.app') {
	apiURL = 'https://red-calm-perch.cyclic.app/api'
}

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

export const getEventsOfToday = async (date) => {
	const timezoneOffset = new Date(date).getTimezoneOffset()

	// Handle Timezone
	const dateToFetch = new Date(date)
	dateToFetch.setHours(0)
	dateToFetch.setMinutes(0 - timezoneOffset)
	dateToFetch.setSeconds(0)

	const endOfDate = new Date(dateToFetch.getTime() + 24 * 60 * 60 * 1000 - 1)

	const response = await createRequest(
		apiURL + `/${dateToFetch.toISOString()}/${endOfDate.toISOString()}`,
		'GET'
	)
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

export const updateEvent = async (data, id) => {
	const response = await createRequest(apiURL + `/updateEvent/${id}`, 'PUT', data)
	return response
}
