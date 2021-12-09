import React from 'react'
import OurService from './OurService'

import classes from './ourService.module.css'

export default function Services() {
    return (
        <div className={classes.container}>
            <h1 className={classes.heading}>Our services</h1>
            <hr className={classes.hr} />
            <div className={classes.serviceContainer}>
                <OurService />
                <OurService />
                <OurService />
            </div>


        </div>
    )
}
