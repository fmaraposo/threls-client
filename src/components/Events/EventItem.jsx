import React, { useState } from 'react'
import { Box, Grow } from '@mui/material'
import { format, parseISO, isSameDay } from 'date-fns'
import { Edit, DeleteOutline, EventBusy, Check, Close } from '@mui/icons-material'
import { deleteEvent } from '../../utils/RequestFunctions'
import { handleState, formatTime } from '../../utils/GlobalFunctions'

const EventItem = ({ events, setEvents, setOpenModal, setEditEvent }) => {
	const [deleteItem, setDeleteItem] = useState(false)

	return (
		<Box sx={{ height: 180 }}>
			<Box>
				{events.map((event, index) => {
					const eventIndex = events.findIndex((e) => e._id === event._id)
					const isEventOnSameDay = isSameDay(parseISO(event.startDate), parseISO(event.endDate))
					return (
						<div key={index} className="event-item__container-parent">
							<Grow
								in={eventIndex === index}
								style={{ transformOrigin: '0 0 0' }}
								timeout={eventIndex === index ? (index + 1) * 750 : 0}
							>
								<Box className="event-item__container">
									<div className="event-item__details">
										{deleteItem && deleteItem === event._id ? (
											<span>Are you sure you want to delete this event ?</span>
										) : (
											<>
												<span className="event-icon">
													<EventBusy />
												</span>
												<span className="event-title">{event.title}</span>
												<span className="event-date date">
													{isEventOnSameDay
														? format(parseISO(event.startDate), 'dd/MM/yyyy')
														: format(parseISO(event.startDate), 'dd/MM/yyyy') -
														  format(parseISO(event.endDate), 'dd/MM/yyyy')}
												</span>
												<span className="event-date time">
													{formatTime(event.startDate)} - {formatTime(event.endDate)}
												</span>

												{event.notes && <span className="event-notes">{event.notes}</span>}
											</>
										)}
									</div>
									<div className="event-item__actions">
										{deleteItem && deleteItem === event._id ? (
											<>
												<Check
													onClick={async () => {
														await deleteEvent(event._id)
														setDeleteItem(false)
														handleState(events, event, setEvents, 'delete')
													}}
												/>
												<Close onClick={() => setDeleteItem(false)} />
											</>
										) : (
											<>
												<Edit
													sx={{ marginRight: '20px' }}
													onClick={() => {
														setEditEvent(event)
														setOpenModal(true)
													}}
												/>
												<DeleteOutline onClick={() => setDeleteItem(event._id)} />
											</>
										)}
									</div>
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
