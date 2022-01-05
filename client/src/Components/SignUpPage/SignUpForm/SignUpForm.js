import React, { useRef, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import AuthContext from '../../../store/auth-context'

import { Form, Button, Row, Col } from 'react-bootstrap'

import { DotLoader } from 'react-spinners'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classes from './signUpForm.module.css'


export default function SignUpForm() {

    const authctx = useContext(AuthContext)
    const [loading, setloading] = useState(false)

    let history = useHistory()

    const nameInputRef = useRef()
    const sureNameInputRef = useRef()
    const mobileCodeInputRef = useRef()
    const mobileNumberInputRef = useRef()
    const cityInputRef = useRef()
    const emailInputRef = useRef()
    const passwordInputRef = useRef()


    const authSubmitHandler = async event => {
        setloading(true)
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredSureName = sureNameInputRef.current.value;
        const enteredMobileNumber = mobileCodeInputRef.current.value + ' ' + mobileNumberInputRef.current.value;
        const enteredAddress = cityInputRef.current.value;
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


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        try {

            toast.info("wait! you are almost there")
            if (enteredName.trim() !== '' && enteredSureName.trim() !== '' && enteredMobileNumber.trim() !== '' && enteredAddress.trim() !== '' && entredEmail.trim() !== '' && enteredPassword.trim() !== '') {
                const response = await fetch('http://localhost:8000/users/register', requestOptions)
                const responded = await response.json()

                toast.info("you successfully registerd your account!")

                const { _id, name, token, emailId } = responded.User;

                console.log(authctx.login(responded.token));

                authctx.fetchuser({ _id, name, token, emailId })

                history.replace('/home')
            } else {
                toast.error("you have not provided enough data!")

            }

            setloading(false)
        } catch (e) {
            toast.error("something went wrong! Account not created !")
            setloading(false)
        }



    }

    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    return (
        <>
            {loading && <div style={style} >div<DotLoader color="#adff2f" loading={loading} size={120} /></div>}

            {!loading && <div className={classes.root}>
                <ToastContainer />

                <Form>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>name</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="Enter Name"
                                ref={nameInputRef}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>surename</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="Enter surename"
                                ref={sureNameInputRef}
                                required
                            />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">
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
                                required
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="city.."
                                ref={cityInputRef}
                                required
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                ref={emailInputRef}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                ref={passwordInputRef}
                                required
                            />
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" id="formGridCheckbox">
                        <Form.Check type="checkbox" label="agree terms and conditions" />
                    </Form.Group>

                    <Button className={classes.button} type="submit" onClick={authSubmitHandler}>
                        Submit
                    </Button>
                </Form>
            </div >}
        </>
    )
}
