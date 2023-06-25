import React from 'react'
import { Box, Grow } from '@mui/material'
import { format, parseISO } from 'date-fns'

const EventItem = ({ events }) => {
	return (
		<Box sx={{ height: 180 }}>
			<Box>
				{events.map((event, index) => {
					const eventIndex = events.findIndex((e) => e.id === event.id)
					return (
						<div key={index} style={{ overflow: 'scroll' }}>
							<Grow
								in={eventIndex === index}
								style={{ transformOrigin: '0 0 0' }}
								timeout={eventIndex === index ? (index + 1) * 750 : 0}
							>
								<Box className="event-item-container">
									<span className="event-title">{event.title}</span>
									<span className="event-date start">
										{format(parseISO(event.startDate), 'dd/MM/yyyy')}
									</span>
									<span className="event-date end">
										{format(parseISO(event.endDate), 'dd/MM/yyyy')}
									</span>
									<span className="event-notes">{event.notes}</span>
								</Box>
							</Grow>
						</div>
					)
				})}
			</Box>
		</Box>
	)
}

export default EventItem
