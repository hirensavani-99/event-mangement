
import React, { useRef, useContext } from 'react'

import EventContext from '../../../store/event-Context'


import { Card, Form, Button, Row, Col } from 'react-bootstrap'

import { FormGroup, Label, Input } from 'reactstrap'




import classes from './RegisterEventForm.module.css'


export default function Form2(props) {

    const eventctx = useContext(EventContext)

    const DateInputRef = useRef('')
    const TimeInputRef = useRef('')
    const adInputRef = useRef('')
    const addressInputRef = useRef('')
    const cityInputRef = useRef('')
    const stateInputRef = useRef('')
    const PostalCodeInput = useRef('')



    const setData = (e) => {
        e.preventDefault()

        const enteredDateTime = new Date(DateInputRef.current.value) + ' ' + TimeInputRef.current.value;
        const enteredad = adInputRef.current.value;
        const enteredAddress = addressInputRef.current.value + ' ' + cityInputRef.current.value + ' ' + stateInputRef.current.value + ' ' + PostalCodeInput.current.value

        if (enteredDateTime.trim() !== '' && enteredad.trim() !== '' && enteredAddress.trim() !== '') {
            const data = {
                eventDate: enteredDateTime,
                address: enteredAddress,
                advertisement: enteredad
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

                                <FormGroup className="mb-3" >
                                    <Label for="exampleDate">
                                        Date
                                    </Label>
                                    <Input
                                        id="exampleDate"
                                        name="date"
                                        placeholder="date placeholder"
                                        type="date"
                                        innerRef={DateInputRef}

                                    />
                                </FormGroup>
                                <FormGroup className="mb-3" >
                                    <Label for="exampleTime">
                                        Time
                                    </Label>
                                    <Input
                                        id="exampleTime"
                                        name="time"
                                        placeholder="time placeholder"
                                        type="time"
                                        innerRef={TimeInputRef}
                                    />
                                </FormGroup>

                                <Form.Group as={Col} className="mb-3" controlId="formGridState">
                                    <Form.Label>Do you want advertise on our platform ?</Form.Label>
                                    <Form.Select defaultValue="Choose..." ref={adInputRef}>
                                        <option>true</option>
                                        <option>false</option>
                                    </Form.Select>
                                </Form.Group>

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
                                    <Button  className={classes.button} onClick={setData}>
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
