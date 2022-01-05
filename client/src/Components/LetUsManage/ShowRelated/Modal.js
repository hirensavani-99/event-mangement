
import React, { useState, useContext, useEffect, useRef } from 'react'
import { Button, Modal, Carousel, Form, Col, Row } from 'react-bootstrap'
import { NavLink, useHistory } from "react-router-dom"
import classes from './Modal.module.css'
import AuthContex from '../../../store/auth-context'
import axios from 'axios'

export default function Modal1(props) {

    const authCtx = useContext(AuthContex)
    let token = authCtx.token
    const history = useHistory();


    const HandleStartChat = async (e) => {
        e.preventDefault();

        const body = {
            otherPerson: props.data._id
        }


        const response = await axios.post('http://localhost:8000/startConversation', body, { headers: { "Authorization": `Bearer ${token}` } })
        history.push(`/conversation/${props.data._id}`)

        props.onHide()
    }

    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        About celebration of {`${props.data.pictures}`}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel className={classes.carousel}>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={`uploads/${props.data.pictures}`}
                                alt="First slide"
                                className={classes.carouselImg}
                            />
                            <Carousel.Caption>
                                <h3>{props.data.OrganizationName}</h3>

                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>

                    <h4>{`${props.data.OrganizationName} is greate organizer working with use from last 5 months.`}</h4>
                    <p>{props.data.aboutYou}</p>
                    <p>{"made up to 100 successfull events !"}</p>
                    <hr />
                    <h4>contact</h4>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                                contact Person
                            </Form.Label>
                            <Col sm="10">
                                <Form.Label column sm="2">
                                    {props.data.ContactPerson}
                                </Form.Label>
                            </Col>
                            <Form.Label column sm="2">
                                contact Email
                            </Form.Label>
                            <Col sm="10">
                                <Form.Label column sm="2">
                                    {props.data.contactEmail}
                                </Form.Label>
                            </Col>
                            <Form.Label column sm="2">
                                contact Address
                            </Form.Label>
                            <Col sm="10">
                                <Form.Label column sm="2">
                                    {props.data.OrganizationAddress}
                                </Form.Label>
                            </Col>
                            <Form.Label column sm="2">
                                Base Price :
                            </Form.Label>
                            <Col sm="10">
                                <Form.Label column sm="2">
                                    {`$ ${props.data.basePrice}`}
                                </Form.Label>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail">

                        </Form.Group>



                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                    <NavLink to={`/conversation`}><Button onClick={HandleStartChat}>Start conversation</Button></NavLink>

                </Modal.Footer>
            </Modal>
        </div>
    )
}
