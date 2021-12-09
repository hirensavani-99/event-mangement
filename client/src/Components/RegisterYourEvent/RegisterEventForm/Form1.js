
import React, { useContext, useRef } from 'react'

import EventContext from '../../../store/event-Context'

import { Card, Form, Button, InputGroup, FormControl, Row, Col } from 'react-bootstrap'



import classes from './RegisterEventForm.module.css'


export default function Form1(props) {

  const eventctx = useContext(EventContext)


  const eventTypeInputRef = useRef("")
  const eventNameInputRef = useRef("")
  const NumberOfPassInputRef = useRef("")
  const PriceOfPassInputRef = useRef("")
  const DescInputRef = useRef("")

  const setData = (e) => {
    e.preventDefault();

    const enteredEventType = eventTypeInputRef.current.value;
    const enteredEventName = eventNameInputRef.current.value;
    const enteredNumberOfPass = NumberOfPassInputRef.current.value;
    const enteredPrice = PriceOfPassInputRef.current.value;
    const enteredDesc = DescInputRef.current.value;


    if (enteredEventType.trim() !== '' && enteredEventName.trim() !== '' && enteredNumberOfPass.trim() !== '' && enteredPrice.trim() !== '' && enteredDesc.trim() !== '') {
      const data = {
        eventTypem: enteredEventType,
        eventName: enteredEventName,
        numberOfPasses: enteredNumberOfPass,
        priceOfPass: enteredPrice,
        desc: enteredDesc
      }

      eventctx.form1Data(data)

      props.nextStep();
    }


  }
  return (


    <>

      <div className={classes.root}>

        <Card className={classes.container} >
          <h2 className={classes.title}>About<span className={classes.span}>E</span>ent</h2>
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
                    <Form.Label>EventName</Form.Label>
                    <Form.Control type="text" placeholder="EventName" ref={eventNameInputRef} />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Number Of Passes</Form.Label>
                    <Form.Control type="Number" placeholder="EventName" ref={NumberOfPassInputRef} />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Price Of Pass</Form.Label>
                    <InputGroup className="mb-3">

                      <InputGroup.Text>$</InputGroup.Text>
                      <FormControl aria-label="Amount (to the nearest dollar)" ref={PriceOfPassInputRef} />
                      <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>description</Form.Label>
                  <Form.Control as="textarea" rows={3} ref={DescInputRef} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Button type="submit" className={classes.button} onClick={props.nextStep} onClick={setData}>
                    Next
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
