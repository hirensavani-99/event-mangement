
import React from 'react'

import Accordion from 'react-bootstrap/Accordion'


import classes from './AboutUs.module.css'
import "bootstrap/dist/css/bootstrap.min.css";
import im from '../../../assets/diwali.jpg'
export default function AboutUs() {



    return (
        <>

            <div className={classes.root}>

                <div>
                    <h1 className={classes.tag}>SOMETHING ABOUT US</h1>

                    <h6 className={classes.tag}>We Imagine! What You Desire!</h6>
                    <hr className={classes.hr} />

                </div>

                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Who we are ?</Accordion.Header>
                        <Accordion.Body className={classes.subroot}>
                            devweloper

                            <div className={classes.picRoot}>
                                <img className={classes.pic} src={im} alt="" />
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>what we have done ?</Accordion.Header>
                        <Accordion.Body className={classes.subroot}>
                            nothing
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>what is our goal ?</Accordion.Header>
                        <Accordion.Body className={classes.subroot}>
                            nothing
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>



        </>
    )
}
