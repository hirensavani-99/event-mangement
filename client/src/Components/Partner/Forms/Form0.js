
import React, { useContext, useRef } from 'react'



import { Card, Form, Button, InputGroup, FormControl, Row, Col } from 'react-bootstrap'



import classes from './Forms.module.css'


export default function Form1(props) {



    return (


        <>

            <div className={classes.rootform}>

                <Card className={classes.container} >
                    <h1>Agreements to be partner</h1>
                    <Button className={classes.button} onClick={props.nextStep}> agree</Button>





                </Card >
            </div >
        </>


    )
}
