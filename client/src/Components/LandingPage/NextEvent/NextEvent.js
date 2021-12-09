import React from 'react'
import ImageCard from './imageCard'
import event from '../../../Static/events'
import useWindowPosition from '../../../hooks/userWindowPosition'


import classes from './NextEvent.module.css'
export default function NextEvent() {
    const checked = useWindowPosition('Header')
    return (
        <>
            <h1 className={classes.tags}>Upcoming events..</h1>
            <hr className={classes.hr} />
            <div className={classes.root} id="NextEvent">

                {event.map(e => (
                    <ImageCard key={e.key} event={e} checked={checked} />
                ))}


            </div>
        </>
    )
}
