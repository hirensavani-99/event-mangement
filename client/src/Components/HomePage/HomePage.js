import React from 'react'



import NavBar from './NavBar/NavBar'
import FindEvent from './Container/FindEvent'


import eventPlan from '../../Static/eventPlan'

import classes from './HomePage.module.css'
export default function HomePage() {
    return (
        <div className={classes.root}>
            <NavBar />
            <div className={classes.findevent}>
                {eventPlan.map(plane => (
                    <FindEvent key={plane.title} plane={plane} />
                ))}
            </div>


        </div>
    )
}
