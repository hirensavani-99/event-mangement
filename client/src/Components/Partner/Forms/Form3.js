
import React, { useState, useRef, useContext, memo } from 'react'
import axios from 'axios'


import EventContext from '../../../store/event-Context'
import AuthContext from '../../../store/auth-context'

import { Card, Form, Button } from 'react-bootstrap'



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import classes from './Forms.module.css'


const Form3 = React.memo((props) => {


    const eventctx = useContext(EventContext)
    const authCtx = useContext(AuthContext)
    let token = authCtx.token
    const data = eventctx.eventData()



    const [btndisable, setBtnDisable] = useState(true)
    const [picture, setPicture] = useState("")
    const [docs, setdocs] = useState("")

    const doneHandler = (e) => {
        e.preventDefault()
        if (picture !== '' && docs !== '') {
            const Data = {
                pictures: picture,
                documents: docs
            }
            eventctx.form3Data(Data)
        }
        setBtnDisable(false)
    }

    const DataSendHandler = (e) => {
        e.preventDefault();

        const formData = new FormData()

        for (let property in data) {

            formData.append(property, data[property])
        }
        try {

            axios.post('http://localhost:8000/partner/register', formData, { headers: { "Content-Type": "form-data" } })
                .then(response => response.json())
                .then(data => console.log(data))
            

            props.nextStep();
        } catch (e) {
            console.log(e);
        }

    }



    const picHandler = e => {

        setPicture(e.target.files[0])
    }
    const docHandler = e => {

        setdocs(e.target.files[0])
    }
    return (

        <>

            <div className={classes.root}>
                <ToastContainer />
                <Card className={classes.container} >
                    <h2 className={classes.title}>Da<span className={classes.span}>T</span>a</h2>
                    <hr />
                    <Card.Body>

                        <Card.Text>
                            <form>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>choose a relevant picture for your Event to show customer</Form.Label>
                                    <Form.Control type="file" onChange={picHandler} />
                                </Form.Group>
                                <Form.Group controlId="picture of your address proof" className="mb-3">
                                    <Form.Label>picture of your address proof and AdharCard</Form.Label>
                                    <Form.Control type="file" multiple onChange={docHandler} />
                                </Form.Group>
                                <div className={classes.np}>
                                    <Button className={classes.button} onClick={props.previousStep}>
                                        privious
                                    </Button>
                                    <Button className={classes.button} onClick={doneHandler}>
                                        Done
                                    </Button>
                                    <Button className={classes.button} onClick={DataSendHandler}  >
                                        Submit
                                    </Button>
                                </div>
                            </form>


                        </Card.Text >

                    </Card.Body >
                </Card >
            </div >
        </>


    )
})


export default Form3