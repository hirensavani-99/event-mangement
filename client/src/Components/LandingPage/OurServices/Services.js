import React from 'react'
import OurService from './OurService'

import classes from './ourService.module.css'

import service from '../../../Static/service.js'

export default function Services() {
    return (
        <div className={classes.container}>
            <h3 className={classes.heading}>Our services</h3>
            <hr className={classes.hr} />
            <div className={classes.serviceContainer}>
                {
                    service.map(service => (<OurService key={service.title} service={service} />))
                }
 
            </div>


        </div>
    )
}
