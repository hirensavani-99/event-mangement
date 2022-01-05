
import React from 'react'

import Accordion from 'react-bootstrap/Accordion'


import classes from './AboutUs.module.css'
import "bootstrap/dist/css/bootstrap.min.css";

export default function AboutUs() {



    return (
        <>

            <div className={classes.root}>

                <div>
                    <h3 className={classes.tag}>SOMETHING ABOUT US</h3>

                    <h6 className={classes.tag}>We Imagine! What You Desire!</h6>
                    <hr className={classes.hr} />

                </div>

                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Who we are ?</Accordion.Header>
                        <Accordion.Body className={classes.subroot}>
                            we are event managers can help you to get in to your dream event or can help you to organize your event without coast of penny!
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>what we have done ?</Accordion.Header>
                        <Accordion.Body className={classes.subroot}>
                            we have sold 1M+ passes on this platform to help people to get in to event as well as we are connected with 100+ partners who can help you to manage your event.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>what is our goal ?</Accordion.Header>
                        <Accordion.Body className={classes.subroot}>
                            until 2024 we are plannig to oragnize 1M+ events and reching towards 10M+. From now no event is hard to manage!
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>



        </>
    )
}
