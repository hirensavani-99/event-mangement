
import React, { useContext, useRef } from 'react'



import { Card, Form, Button, InputGroup, FormControl, Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'


import classes from './Forms.module.css'


export default function Form4(props) {

    let history = useHistory()
    const DoneHandler = () => {
        history.replace('/')
    }

    return (


        <>

            <div className={classes.rootform}>

                <Card className={classes.container} >
                    <h1>Lot of information to being a partner</h1>
                    <p>Your registration is complited we will be back via email once we will verify your account untill that enjoy EventEve.</p>
                    <Button className={classes.button} onClick={DoneHandler}> ok</Button>





                </Card >
            </div >
        </>


    )
}
