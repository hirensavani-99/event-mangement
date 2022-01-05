import React, { useState, useContext, useRef } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import AuthContex from '../../../store/auth-context'
import axios from 'axios'

export default function FormModel1(props) {
    console.log(props);




    const [data, setdata] = useState(props.data)
    const [OrganizationName, setOrganizationName] = useState(props.data.OrganizationName)
    const [ContactPerson, setContactPerson] = useState(props.data.ContactPerson)
    const [contactEmail, setcontactEmail] = useState(props.data.contactEmail)
    const [contactNumber, setcontactNumber] = useState(props.data.contactNumber)
    const [city, setcity] = useState(props.data.city)
    const [seen, setseen] = useState(props.data.seen)
    const [updated, setupdated] = useState({})


    const authCtx = useContext(AuthContex)
    let token = authCtx.token

    const organizationChangeHanler = (e) => {
        e.preventDefault()
        setOrganizationName(e.target.value)
    }

    const contactPersonChangeHandler = (e) => {
        e.preventDefault()
        setContactPerson(e.target.value)
    }

    const contactEmailChangeHandler = (e) => {
        e.preventDefault()
        setcontactEmail(e.target.value)
    }

    const contactNumberChangeHandler = (e) => {
        e.preventDefault()
        setcontactNumber(e.target.value)
    }

    const cityChangeHandler = (e) => {
        e.preventDefault()
        setcity(e.target.value)
    }
    const seenChangeHandler = (e) => {
        e.preventDefault()
        setseen(e.target.value)
    }

    const updateHandler = (e) => {
        e.preventDefault()
        const DataToUpdate = {
            OrganizationName: OrganizationName,
            ContactPerson: ContactPerson,
            seen: seen,
            contactEmail: contactEmail,
            contactNumber: contactNumber,
            city: city
        }
        setupdated({
            OrganizationName: OrganizationName,
            ContactPerson: ContactPerson,
            seen: seen,
            contactEmail: contactEmail,
            contactNumber: contactNumber,
            city: city
        })
        props.getId(props.data._id)
        props.onSaveupdatedData(DataToUpdate)
    }



    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="formGridAddress2">
                    <Form.Label>Event</Form.Label>
                    <Form.Control value={OrganizationName} onChange={organizationChangeHanler} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control value={ContactPerson} onChange={contactPersonChangeHandler} />
                </Form.Group>



                <Col className="mb-3">


                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>seen</Form.Label>
                            <Form.Select defaultValue={seen} onChange={seenChangeHandler}>
                                <option>false</option>
                                <option>true</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Totalpass</Form.Label>
                            <Form.Control value={contactNumber} onChange={contactNumberChangeHandler} />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>PriceOfPass</Form.Label>
                            <Form.Control value={city} onChange={cityChangeHandler} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>PriceOfPass</Form.Label>
                            <Form.Control value={contactEmail} onChange={contactEmailChangeHandler} />
                        </Form.Group>
                    </Row>


                </Col>


                <Button variant="primary" onClick={updateHandler}>
                    Done
                </Button>


            </Form>
        </div>
    )
}
