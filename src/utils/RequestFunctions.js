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
export const getEventsOfToday = async () =>
	await createRequest(apiURL + `/${new Date().toISOString()}`, 'GET')
export const postEvents = async (data) => await createRequest(apiURL, 'POST', data)
export const deleteEvent = async (id) => await createRequest(apiURL, 'DELETE')
