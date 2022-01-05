import React, { useRef, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import AuthContext from '../../../store/auth-context';

import { Card, Form, Button } from 'react-bootstrap'



import classes from './SignInForm.module.css'


import { DotLoader } from 'react-spinners'
import { ToastContainer, toast } from 'react-toastify';

export default function SignIn() {

    const authctx = useContext(AuthContext)
    const emailInputRef = useRef("")
    const passwordInputRef = useRef("")

    const [loading, setloading] = useState(false)


    const [partner, setPartner] = useState(false)
    console.log(partner);


    let history = useHistory()

    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    const authSubmitHandler = async (e) => {
        e.preventDefault();
        setloading(true)
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        let data;

        if (partner) {
            data = {
                contactEmail: enteredEmail,
                password: enteredPassword
            }

        } else {
            data = {
                emailId: enteredEmail,
                password: enteredPassword
            }
        }




        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        try {
            if (enteredEmail.trim !== '' && enteredPassword.trim() !== '') {

                let url;
                partner ? url = "http://localhost:8000/Partner/login" : url = 'http://localhost:8000/users/login'


                const response = await fetch(url, requestOptions);
                const responded = await response.json()


                if (!partner) {
                    toast.success("logged in as a user")
                    const { _id, name, token, emailId } = responded.user;
                    authctx.login(responded.token);
                    authctx.fetchuser({ _id, name, token, emailId })
                    history.replace('/home')
                } else {
                    toast.info("logged in as a partner")
                    console.log(responded);
                    const { _id, OrganizationName, token, contactEmail } = responded.partner;
                    authctx.login(responded.token);
                    authctx.fetchuser({ _id, OrganizationName, token, contactEmail })
                    history.replace('/conversation')
                }

            } else {
                toast.error("not provided enough data")
            }
            setloading(false)
        } catch (e) {
            toast.error("Authentication failed")
            setloading(false)
        }
    }

    return (
        <>

            <div className={classes.root}>
                <ToastContainer />
                <Card className={classes.container} >
                    <h2 className={classes.title}>Si<span className={classes.span}>g</span>nIn</h2>
                    <hr />
                    <Card.Body>

                        <Card.Text>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" ref={emailInputRef} />
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" ref={passwordInputRef} />
                                    </Form.Group>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="remember me" />
                                    <Form.Check type="checkbox" label="Login as a partner" onChange={(e) => { setPartner(e.target.checked) }} />
                                </Form.Group>
                                {!loading ? <Button type="submit" className={classes.button} onClick={authSubmitHandler}>
                                    Submit
                                </Button> : <div style={style} >div<DotLoader color="#adff2f" className={classes.button} loading={loading} size={120} /></div>}
                            </Form>
                        </Card.Text >

                    </Card.Body >
                </Card >
            </div >
        </>



    )
}
