import React, { useRef, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import AuthContext from '../../../store/auth-context';

import { Card, Form, Button } from 'react-bootstrap'

import Alert from '../../../utils/Alert'

import classes from './SignInForm.module.css'


import { DotLoader } from 'react-spinners'

export default function SignIn() {

    const authctx = useContext(AuthContext)
    const emailInputRef = useRef("")
    const passwordInputRef = useRef("")

    const [loading, setloading] = useState(false)

    const [error, seterror] = useState(null)


    let history = useHistory()

    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    const authSubmitHandler = async (e) => {
        e.preventDefault();
        setloading(true)
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        const data = {
            emailId: enteredEmail,
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
            if (enteredEmail.trim !== '' && enteredPassword.trim() !== '') {
                seterror("you are logging In")

                const response = await fetch('http://localhost:8000/users/login', requestOptions);
                const responded = await response.json()


                const { _id, name, token, emailId } = responded.user;


                authctx.login(responded.token);

                authctx.fetchuser({ _id, name, token, emailId })



                history.replace('/contactus')
            } else {
                seterror("not provided enough data")
            }
            setloading(false)
        } catch (e) {
            showAlert('oopps! something went wrong')
            setloading(false)
        }
    }

    return (
        <>
            {error && <div className={classes.alert}><Alert className={classes.alert} description={error} /></div>}
            <div className={classes.root}>

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
                                    <Form.Check type="checkbox" label="Check me out" />
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


{/*
 <FormCard buttonText="submit"
                            title="login page">
                            <FormTextInput
                                name="password"
                                type="password"
                                label="password"
                                placeholder="enter password"
                                onChange={true}
                                onBlur={true}

                                error={false}
                            />
                            <FormTextInput
                                name="password"
                                type="password"
                                label="password"
                                placeholder="enter password"
                                onChange={true}
                                onBlur={true}
                                value={12345678}
                                error={false}
                            />
                        </FormCard>*/ }