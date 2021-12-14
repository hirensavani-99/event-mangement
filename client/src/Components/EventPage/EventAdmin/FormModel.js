import React, { useState, useContext, useRef } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import AuthContex from '../../../store/auth-context'
import axios from 'axios'

export default function FormModel(props) {
    //console.log(props);

    const eventRef = useRef(props.data.eventName)
    const addressRef = useRef(props.data.address)
    const seenRef = useRef(props.data.seen)
    const numberOfpassRef = useRef(props.data.numberOfPasses)
    const priceOfpass = useRef(props.data.priceOfPass)


    const [data, setdata] = useState(props.data)
    const [event, setevent] = useState(props.data.eventName)
    const [Adreess, setAddress] = useState(props.data.address)
    const [seen, setseen] = useState(props.data.seen)
    const [numberOfPasses, setnumberOfPasses] = useState(props.data.numberOfPasses)
    const [priceOfPass, setpriceOfPass] = useState(props.data.priceOfPass)
    const [updated, setupdated] = useState({})


    const authCtx = useContext(AuthContex)
    let token = authCtx.token

    const eventChange = (e) => {
        e.preventDefault()
        setevent(e.target.value)
    }

    const AddressChange = (e) => {
        e.preventDefault()
        setAddress(e.target.value)
    }

    const seenChange = (e) => {
        e.preventDefault()
        setseen(e.target.value)
    }

    const numberofpassChange = (e) => {
        e.preventDefault()
        setnumberOfPasses(e.target.value)
    }

    const priceofpassChange = (e) => {
        e.preventDefault()
        setpriceOfPass(e.target.value)
    }

    const updateHandler = (e) => {
        e.preventDefault()
        const DataToUpdate = {
            eventName: event,
            address: Adreess,
            seen: seen,
            numberOfPasses: numberOfPasses,
            priceOfPass: priceOfPass
        }
        setupdated({
            eventName: event,
            address: Adreess,
            seen: seen,
            numberOfPasses: numberOfPasses,
            priceOfPass: priceOfPass
        })
        props.getId(props.data._id)
        props.onSaveupdatedData(DataToUpdate)
    }

  

    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="formGridAddress2">
                    <Form.Label>Event</Form.Label>
                    <Form.Control value={event} onChange={eventChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control value={Adreess} onChange={AddressChange} />
                </Form.Group>



                <Row className="mb-3">


                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>seen</Form.Label>
                        <Form.Select defaultValue={seen} onChange={seenChange}>
                            <option>false</option>
                            <option>true</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Totalpass</Form.Label>
                        <Form.Control value={numberOfPasses} onChange={numberofpassChange} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>PriceOfPass</Form.Label>
                        <Form.Control value={priceOfPass} onChange={priceofpassChange} />
                    </Form.Group>
                </Row>


                <Button variant="primary" onClick={updateHandler}>
                    Done
                </Button>

                
            </Form>
        </div>
    )
}
