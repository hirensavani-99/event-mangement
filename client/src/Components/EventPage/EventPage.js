import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import AuthContex from '../../store/auth-context'
import EventCard from './EventCard/EventCard'
import { Admin, Resource } from 'react-admin';
import restProvide from 'ra-data-simple-rest'

import classes from './EventPage.module.css'

import NavBar from '../HomePage/NavBar/NavBar'
import EventAdmin from './EventAdmin/EventAdmin'
export default function EventPage() {

    const authCtx = useContext(AuthContex)
    let token = authCtx.token
    const [events, setEvents] = useState(null)

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get('http://localhost:8000/getallEvents', { headers: { "Authorization": `Bearer ${token}` } })

            setEvents(response.data)
        }

        getData()

    }, [])

    console.log(events)

    return (
        <div className={classes.root0}>
            <NavBar />
            <div className={classes.root}>
                {events && events[0].seen && events.map(event => (<EventCard className={classes.eventcard} event={event} />))}
                {events && !events[0].seen && (
                    <Admin dataProvider={events}>
                        <Resource name="events" list={EventAdmin} />
                    </Admin>
                )
                }
            </div>
        </div >
    )
}
