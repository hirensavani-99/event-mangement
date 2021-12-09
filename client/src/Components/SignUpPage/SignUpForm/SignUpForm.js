import React, { useRef, useState, useContext } from 'react'

import { useHistory } from 'react-router-dom'
import AuthContext from '../../../store/auth-context'

import Alert from '../../../utils/Alert'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


import { DotLoader } from 'react-spinners'


import classes from './signUpForm.module.css'


export default function SignUpForm() {

    const authctx = useContext(AuthContext)

    const [loading, setloading] = useState(false)

    const [error, seterror] = useState(null)

    let history = useHistory()

    const nameInputRef = useRef()
    const sureNameInputRef = useRef()
    const mobileCodeInputRef = useRef()
    const mobileNumberInputRef = useRef()
    const addressInputRef = useRef()
    const cityInputRef = useRef()
    const stateInputRef = useRef()
    const zipInputRef = useRef()
    const emailInputRef = useRef()
    const passwordInputRef = useRef()


    const authSubmitHandler = async event => {
        setloading(true)
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredSureName = sureNameInputRef.current.value;
        const enteredMobileNumber = mobileCodeInputRef.current.value + ' ' + mobileNumberInputRef.current.value;
        const enteredAddress = addressInputRef.current.value + ' ' + zipInputRef.current.value + ' ' + cityInputRef.current.value + ' ' + stateInputRef.current.value;
        const entredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;


        const data = {
            name: enteredName,
            sureName: enteredSureName,
            location: enteredAddress,
            contactNumber: enteredMobileNumber,
            emailId: entredEmail,
            password: enteredPassword
        }

        const showAlert = (alert) => {
            seterror(alert)

            setTimeout(() => {
                seterror(null)
            }, 2000)
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        try {

            showAlert("getting logged In")
            if (enteredName.trim() !== '' && enteredSureName.trim() !== '' && enteredMobileNumber.trim() !== '' && enteredAddress.trim() !== '' && entredEmail.trim() !== '' && enteredPassword.trim() !== '') {
                const response = await fetch('http://localhost:8000/users/register', requestOptions)
                const responded = await response.json()

                const { _id, name, token, emailId } = responded.User;

                console.log(authctx.login(responded.token));

                authctx.fetchuser({ _id, name, token, emailId })


                history.replace('/contactus')
            } else {
                showAlert('you have not filled enough data in form!')
            }

            setloading(false)
        } catch (e) {
            showAlert(e)
            setloading(false)
        }



    }

    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    return (
        <>
            {loading && <div style={style} >div<DotLoader color="#adff2f" loading={loading} size={120} /></div>}
            <div className={classes.alert}><Alert className={classes.alert} description={error} /></div>
            {!loading && <div className={classes.root}>

                <Form>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>name</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="Enter Name"
                                ref={nameInputRef}

                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>surename</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="Enter surename"
                                ref={sureNameInputRef}
                            />
                        </Form.Group>

                    </Row>

                    <Row>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>country code</Form.Label>
                            <Form.Select
                                defaultValue="Choose..."
                                ref={mobileCodeInputRef}>
                                <option>+48</option>
                                <option>+91</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>mobileNumber</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="Enter contact Number"
                                ref={mobileNumberInputRef}
                            />
                        </Form.Group>
                    </Row>
                    <Row className={classes.add}>

                        <Form.Group className="mb-3" controlId="formGridAddress2">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="Apartment, studio, or floor"
                                ref={addressInputRef}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="city.."
                                ref={cityInputRef}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>State</Form.Label>
                            <Form.Select
                                defaultValue="Choose..."
                                ref={stateInputRef}
                            >
                                <option>Choose...</option>
                                <option>surat</option>
                                <option>mumbai</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="enterZip"
                                ref={zipInputRef} />
                        </Form.Group>
                    </Row>


                    <Row className="mb-3">

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                ref={emailInputRef}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                ref={passwordInputRef}
                            />
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={authSubmitHandler}>
                        Submit
                    </Button>
                </Form>
            </div >}
        </>
    )
}
