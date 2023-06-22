const apiURL = 'http://localhost:3000/api/events'

const createRequest = async (url = '', method, data = {}) => {
	const response = await fetch(url, {
		method: method,
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		//body: JSON.stringify(data),
	})

	return response.json()
}

export const getAllEvents = async () => await createRequest(apiURL, 'GET')
export const postEvents = async (data) => await createRequest(apiURL, 'POST', data)
export const deleteEvent = async (id) => await createRequest(apiURL, 'DELETE')


