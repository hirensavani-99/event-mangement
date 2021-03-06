import React, { useState, useContext, useEffect, useRef } from 'react'
import { Button, Modal, Carousel, Form, Col, Row } from 'react-bootstrap'
import AuthContex from '../../../store/auth-context'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import classes from './Modal.module.css'
export default function ModalEvent(props) {
    const authCtx = useContext(AuthContex)
    let token1 = authCtx.token
    const [numberOfPass, setNumberOfPass] = useState(1)

    const onChangeNumberOfPass = async (e) => {
        setNumberOfPass(e.target.value)
    }

    const handlePayment = async (token) => {
        const body = {
            token,
            event: props.data,
            NumberOfPasses: numberOfPass,
            Charged: numberOfPass * props.data.priceOfPass
        }

        const headers = {
            "Authorization": `Bearer ${token1}`,
            "Content-type": "application/json"
        }

        try {
            const response = await axios.post(`http://localhost:8000/pass/buy/${props.data._id}`, body, { headers: { "Authorization": `Bearer ${token1}` } })
            console.log(response.data);

            props.onHide()

            toast.success('payment successfull')


        } catch (e) {
            toast.error('payment was not  successfull')
        }


    }
    console.log(process.env.REACT_APP_KEY);


    return (
        <div>
            <ToastContainer autoClose={5000}
            />
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        About celebration of {`${props.data.eventName}`}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel className={classes.carousel}>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={`uploads/${props.data.picture}`}
                                alt="First slide"
                                className={classes.carouselImg}
                            />
                            <Carousel.Caption>
                                <h3>{props.data.eventName}</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                    <h4>{`Take part in ${props.data.eventName} event only in $  ${props.data.priceOfPass}`}</h4>
                    <p>{props.data.desc}</p>
                    <p>{`be fast only ${props.data.numberOfPasses} left`}</p>
                    <hr />
                    <h4>Buy your passes to get in</h4>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                                Address
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue={': ' + props.data.address} />
                            </Col>
                            <Form.Label column sm="2">
                                Time and Date
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue={': ' + props.data.eventDate} />
                            </Col>
                            <Form.Label column sm="2">
                                price
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue={': $' + props.data.priceOfPass} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Number of Pass You want to buy</Form.Label>
                                    <Form.Control type="Number" placeholder={numberOfPass} onChange={onChangeNumberOfPass} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label >Total Payable amount:</Form.Label>
                                    <Form.Control disabled placeholder={`payable amount: ${props.data.priceOfPass * numberOfPass} `} />
                                </Form.Group>


                            </Row>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>

                    <StripeCheckout
                        stripeKey="pk_test_51K6yIdAy7KDVZHoTFOdUB6sRjyJBNhvqKha7UAcn5cKmyy1zxyQlF7nCdkVvvpqCm52VRoHZsPbZhEJlVXNTnu7N00paEBKEL2"
                        token={handlePayment}
                        name="Buy your pass"
                        amount={props.data.priceOfPass * numberOfPass * 100}>
                        <Button onClick={props.onHide}>{`payable amount: ${props.data.priceOfPass * numberOfPass} `}</Button>
                    </StripeCheckout>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
