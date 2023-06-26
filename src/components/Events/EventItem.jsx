import React, { useState } from 'react'
import { Box, Grow } from '@mui/material'
import { format, parseISO, isSameDay } from 'date-fns'
import { Edit, DeleteOutline, Celebration, Check, Close } from '@mui/icons-material'
import { deleteEvent } from '../../utils/RequestFunctions'
import { handleState } from '../../utils/HandleStateFunctions'

const EventItem = ({ events, setEvents, setOpenModal, setEditEvent }) => {
	const [deleteItem, setDeleteItem] = useState(false)

	return (
		<Box sx={{ height: 180 }}>
			<Box>
				{events.map((event, index) => {
					const eventIndex = events.findIndex((e) => e.id === event.id)
					const isEventOnSameDay = isSameDay(parseISO(event.startDate), parseISO(event.endDate))
					return (
						<div key={index} style={{ overflow: 'scroll' }}>
							<Grow
								in={eventIndex === index}
								style={{ transformOrigin: '0 0 0' }}
								timeout={eventIndex === index ? (index + 1) * 750 : 0}
							>
								<Box className="event-item-container">
									<div className="event-item-details">
										{deleteItem && deleteItem === event.id ? (
											<span>Are you sure you want to delete this event ?</span>
										) : (
											<>
												<span className="event-icon">
													<Celebration />
												</span>
												<span className="event-title">{event.title}</span>
												<span className="event-date date">
													{isEventOnSameDay
														? format(parseISO(event.startDate), 'dd/MM/yyyy')
														: format(parseISO(event.startDate), 'dd/MM/yyyy') -
														  format(parseISO(event.endDate), 'dd/MM/yyyy')}
												</span>
												<span className="event-date time">
													{format(parseISO(event.startDate), 'HH:mm')} -{' '}
													{format(parseISO(event.endDate), 'HH:mm')}
												</span>

												<span className="event-notes">{event.notes}</span>
											</>
										)}
									</div>
									<div className="event-item-actions">
										{deleteItem && deleteItem === event.id ? (
											<>
												<Check
													sx={{ marginRight: '20px' }}
													onClick={async () => {
														await deleteEvent(event.id)
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
												<DeleteOutline onClick={() => setDeleteItem(event.id)} />
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
