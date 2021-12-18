
import React, { useRef, useContext } from 'react'

import EventContext from '../../../store/event-Context'


import { Card, Form, Button, Row, Col } from 'react-bootstrap'

import { FormGroup, Label, Input } from 'reactstrap'




import classes from './Forms.module.css'


export default function Form2(props) {

    const eventctx = useContext(EventContext)

    const emailInputRef = useRef('')
    const passwordInputRef = useRef('')

    const addressInputRef = useRef('')
    const cityInputRef = useRef('')
    const stateInputRef = useRef('')
    const PostalCodeInput = useRef('')



    const setData = (e) => {
        e.preventDefault()


        const enteredEmail = emailInputRef.current.value
        const enteredPassword = passwordInputRef.current.value
        const enteredAddress = addressInputRef.current.value + ' ' + cityInputRef.current.value + ' ' + stateInputRef.current.value + ' ' + PostalCodeInput.current.value

        if ( enteredEmail.trim() !== '' && enteredPassword !== '' && enteredAddress.trim() !== '') {
            const data = {
                contactEmail: enteredEmail,
                password: enteredPassword,
                OrganizationAddress: enteredAddress

            }
            eventctx.form2Data(data)

            props.nextStep();
        }
    }


    return (

        <>

            <div className={classes.root}>

                <Card className={classes.container} >
                    <h2 className={classes.title}>De<span className={classes.span}>ta</span>ils</h2>
                    <hr />
                    <Card.Body>

                        <Card.Text>
                            <Form>

                                <Row className="mb-3">
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Contact Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" ref={emailInputRef} />
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" ref={passwordInputRef} />
                                    </Form.Group>
                                </Row>


                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control placeholder="1234 Main St" ref={addressInputRef} />
                                </Form.Group>

                                <Row className="mb-3">
                                    <Col xs={5}>
                                        <Form.Control placeholder="City" ref={cityInputRef} />
                                    </Col>
                                    <Col>
                                        <Form.Control placeholder="State" ref={stateInputRef} />
                                    </Col>
                                    <Col>
                                        <Form.Control placeholder="Zip" ref={PostalCodeInput} />
                                    </Col>
                                </Row>
                                <div className={classes.np}>
                                    <Button className={classes.button} onClick={props.previousStep}>
                                        previous
                                    </Button>
                                    <Button className={classes.button} onClick={setData}>
                                        next
                                    </Button>
                                </div>
                            </Form>
                        </Card.Text >

                    </Card.Body >
                </Card >
            </div >
        </>


    )
}
