
import React, { useContext, useRef } from 'react'

import EventContext from '../../../store/event-Context'

import { Card, Form, Button, InputGroup, FormControl, Row, Col } from 'react-bootstrap'



import classes from './Forms.module.css'


export default function Form1(props) {

  const eventctx = useContext(EventContext)


  const OrganizationInputRef = useRef("")
  const OrganizationIdInputRef = useRef("")
  const contactPersonInputRef = useRef("")
  const contactPhoneNumberInputRef = useRef("")
  const DescInputRef = useRef("")

  const setData = (e) => {
    e.preventDefault();

    const enteredOrganizationName = OrganizationInputRef.current.value;
    const enteredOrganizationId = OrganizationIdInputRef.current.value;
    const enteredcontactPerson = contactPersonInputRef.current.value;
    const enteredPhoneNumber = contactPhoneNumberInputRef.current.value;
    const enteredDesc = DescInputRef.current.value;


    if (enteredOrganizationName.trim() !== '' && enteredOrganizationId.trim() !== '' && enteredcontactPerson.trim() !== '' && enteredPhoneNumber.trim() !== '' && enteredDesc.trim() !== '') {
      const data = {
        OrganizationName: enteredOrganizationName,
        OrganizationId: enteredOrganizationId,
        ContactPerson: enteredcontactPerson,
        contactNumber: enteredPhoneNumber,
        aboutYou: enteredDesc
      }

      eventctx.form1Data(data)

      props.nextStep();
    }


  }
  return (


    <>

      <div className={classes.root}>

        <Card className={classes.container} >
          <h2 className={classes.title}>About Com<span className={classes.span}>P</span>any</h2>
          <hr />
          <Card.Body>

            <Card.Text>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Organization Name</Form.Label>
                    <Form.Control type="text" placeholder="xyz organization Name" ref={OrganizationInputRef} />
                  </Form.Group>
                  <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Organization Id</Form.Label>
                    <Form.Control type="text" placeholder="GST number" ref={OrganizationIdInputRef} />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Contact Person</Form.Label>
                    <Form.Control type="text" placeholder="Contact Person Name" ref={contactPersonInputRef} />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Contact PhoneNumber</Form.Label>
                    <InputGroup className="mb-3">


                      <FormControl aria-label="Amount (to the nearest dollar)" type="string" ref={contactPhoneNumberInputRef} placeHolder="123-456-789" />

                    </InputGroup>
                  </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Something About Your company</Form.Label>
                  <Form.Control as="textarea" rows={3} ref={DescInputRef} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Button type="submit" className={classes.button} onClick={setData}  >
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
