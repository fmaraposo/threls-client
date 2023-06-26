import React, { useEffect } from 'react'
import EventItem from './EventItem'
import { getEventsOfToday } from '../../utils/RequestFunctions'
import { parseISO } from 'date-fns'

const EventsList = ({ date, events, setEvents, setOpenModal, setEditEvent }) => {
	useEffect(() => {
		async function getTodayEvents(date) {
			const response = await getEventsOfToday(date)
			const sortEvents = response.sort((a, b) => parseISO(a.startDate) - parseISO(b.startDate))
			setEvents(sortEvents)
			return sortEvents
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
				<div className="events">
					<h1 className="day">{date.getUTCDate()}</h1>
					<span className="weekDay">{getWeekDay(date)}</span>
				</div>
				{events.length > 0 && (
					<ul className="list-events">
						<EventItem
							events={events}
							setEvents={setEvents}
							setOpenModal={setOpenModal}
							setEditEvent={setEditEvent}
						/>
					</ul>
				)}
			</section>
		</div>
	)
}

export default EventsList
