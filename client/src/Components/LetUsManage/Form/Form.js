
import React, { useContext, useRef } from 'react'
import axios from 'axios'


import AuthContext from '../../../store/auth-context'
import { Card, Form, Button, InputGroup, FormControl, Row, Col } from 'react-bootstrap'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




import classes from './Form.module.css'


export default function Form1(props) {

    const authCtx = useContext(AuthContext)
    let token = authCtx.token


    const eventTypeInputRef = useRef("")
    const numberOfGuestInputRef = useRef("")
    const basePriceInputRef = useRef("")
    const cityInputRef = useRef("")

    const searchData = async (e) => {
        e.preventDefault();
        const enteredNumberOfGuest = numberOfGuestInputRef.current.value;
        const enteredBasePrice = basePriceInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const body = {
            city: enteredCity,
            guest: enteredNumberOfGuest,
            basePrice: enteredBasePrice
        }

        try {
            const response = await axios.post('http://localhost:8000/findrelated', body, { headers: { "Authorization": `Bearer ${token}` } })

            
            if (response.status === 200) {
                toast.success(`${response.status} : request successFull wait a min we will serve you`)
                props.onSearchHandler(response.data)
            }

            if (response.status === 204) {
                toast.warn(`${response.status} : oops! no match found`);
            }
        } catch (e) {
            toast.error("connection losed! ");
        }
    }

    return (


        <>

            <div className={classes.root}>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Card className={classes.container} >
                    <h2 className={classes.title}>Find<span className={classes.span}>P</span>artner</h2>
                    <hr />
                    <Card.Body>

                        <Card.Text>
                            <Form>
                                <Row className="mb-3">
                                    <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>EventType</Form.Label>
                                        <Form.Control type="text" placeholder="EventType" ref={eventTypeInputRef} />
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Number of guest</Form.Label>
                                        <Form.Control type="text" placeholder="EventName" ref={numberOfGuestInputRef} />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>base price</Form.Label>
                                        <Form.Control type="Number" placeholder="EventName" ref={basePriceInputRef} />
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>city</Form.Label>
                                        <Form.Control placeholder="EventName" ref={cityInputRef} />
                                    </Form.Group>
                                </Row>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Button className={classes.button} onClick={searchData}>
                                        Find
                                    </Button>
                                </Form.Group>

                            </Form>

                        </Card.Text >

                    </Card.Body >
                </Card >
            </div >
        </>


    )
}
