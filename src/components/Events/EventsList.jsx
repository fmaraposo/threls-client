import React, { useEffect, useState } from 'react'
import EventItem from './EventItem'
import { getEventsOfToday } from '../../utils/RequestFunctions'

const EventsList = ({ date }) => {
	const [events, setEvents] = useState([])
	useEffect(() => {
		async function getTodayEvents(date) {
			const response = await getEventsOfToday(date)
			setEvents(response)
			return response
		}
		getTodayEvents(date)
	}, [date])

	const getWeekDay = (date) => {
		const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
		return days[date.getDay()]
	}

	return (
		<div className="events-list-container">
			<section className="list-events-container">
				<div className='events'>
					<h1 className='day'>{date.getUTCDate()}</h1>
					<span className='weekDay'>{getWeekDay(date)}</span>
				</div>
				{events.length > 0 && (
					<ul className="list-events">
						<EventItem events={events} />
					</ul>
				)}
			</section>
		</div>
	)
}

export default EventsList
