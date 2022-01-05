import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import AuthContex from '../../store/auth-context'
import EventCard from './EventCard/EventCard'


import classes from './EventPage.module.css'

import NavBar from '../HomePage/NavBar/NavBar'
import EventAdmin from './EventAdmin/EventAdmin'


export default function EventPage() {

    const authCtx = useContext(AuthContex)
    let token = authCtx.token
    const [events, setEvents] = useState(null)
    const [partner, setPartner] = useState(null)
    const [change, setChange] = useState(false)

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get('http://localhost:8000/getallEvents', { headers: { "Authorization": `Bearer ${token}` } })

            setEvents(response.data)
        }

        getData()

    }, [change])

    useEffect(() => {
        const getpartnerData = async () => {

            try {
                console.log('x');
                const response = await axios.get('http://localhost:8000/getAllPartner', { headers: { "Authorization": `Bearer ${token}` } })

                console.log(response);
                setPartner(response.data)

            } catch (e) {
                console.log(e);
            }

        }



        getpartnerData()

    }, [change])


    const UpdateHandle = () => {
        setChange(!change)
    }


    

    return (
        <div className={classes.root0}>
            <NavBar />
            <div className={classes.root}>
                {partner && !partner[0].seen && <h1>Partners</h1>}
                {partner && !partner[0].seen && (<EventAdmin partner={partner} onUpdateData={UpdateHandle} />)}
            </div>
            <div className={classes.root}>
                {events && !events[0].seen && <h1>Organizers</h1>}
                {events && events[0].seen && events.map(event => (<EventCard key={event._id} className={classes.eventcards} event={event} />))}
                {events && !events[0].seen && (<EventAdmin events={events} onUpdateData={UpdateHandle} />)}
            </div>


        </div >
    )
}
