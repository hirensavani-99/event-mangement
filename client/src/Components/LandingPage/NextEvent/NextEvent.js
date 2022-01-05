import React, { useEffect, useState } from 'react'
import ImageCard from './imageCard'
import event from '../../../Static/events'
import useWindowPosition from '../../../hooks/userWindowPosition'



import classes from './NextEvent.module.css'
export default function NextEvent() {

    const [data, setData] = useState(null)
    useEffect(() => {
        fetch("http://localhost:8000/getEventToAddvertise")
            .then(response => response.json())
            .then(data => setData(data))
    }, [])
    console.log(data);
    const checked = useWindowPosition('Header')
    return (
        <>
            <h3 className={classes.tags}>Upcoming events..</h3>
            <hr className={classes.hr} />
            <div className={classes.root} id="NextEvent">

                {data !== null && data.map(e => (
                    <ImageCard key={e._id} event={e} checked={checked} />
                ))}
                {
                    data === null || data.length === 0 && <h1 className={classes.h1}> we are sorry to say there is no events near you!</h1>
                }


            </div>
        </>
    )
}
