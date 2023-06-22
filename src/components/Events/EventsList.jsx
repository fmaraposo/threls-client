import React from 'react'
import EventItem from './EventItem'
import threlsLogo from '../../assets/threls.svg'

const EventsList = () => {
	return (
		<div className="events-list-container">
      <div className='logo-container'>
			  <img src={threlsLogo} alt="threls logo" className="logo" width={'60%'}/>
      </div>
      <section className='list-events-container'>
        <ul className="list-events">
          <EventItem />
        </ul>
      </section>
		</div>
	)
}

export default EventsList
