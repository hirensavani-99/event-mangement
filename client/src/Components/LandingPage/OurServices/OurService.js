
import React from 'react'

import classes from './ourService.module.css'

import img from '../../../assets/holi.jpg'
export default function OurService() {
    return (
        <div className={classes.root}>
            <div className={classes.picRoot}>
                <img className={classes.pic} src={img} alt="img" />
            </div>
            <h3 className={classes.lable}>CORPORATE EVENTS & SEMINARS</h3>
        </div>
    )
}
