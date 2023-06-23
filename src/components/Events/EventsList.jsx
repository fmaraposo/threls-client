import React, { useEffect, useState } from 'react'
import EventItem from './EventItem'
import threlsLogo from '../../assets/threls.svg'
import { getEventsOfToday } from '../../utils/RequestFunctions'

const EventsList = () => {
	const [events, setEvents] = useState([])

	useEffect(() => {
		async function getTodayEvents() {
			const response = await getEventsOfToday()
			setEvents(response)
			return response
		}
		getTodayEvents()
	}, [])

	return (
		<div className="events-list-container">
			<div className="logo-container">
				<img src={threlsLogo} alt="threls logo" className="logo" width={'40%'} />
			</div>
			<section className="list-events-container">
				{events.length === 0 ? (
					<div className="no-events-container">
						<h2>You don't have any events yet, please click on the calendar an add one</h2>
					</div>
				) : (
					<ul className="list-events">
						<EventItem />
					</ul>
				)}
			</section>
		</div>
	)
}

export default EventsList
