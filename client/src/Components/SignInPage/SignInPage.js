import React from 'react'

import Header from '../LandingPage/Header/Header'
//import SignInForm from './SigInForm/SignInForm'
import SignIn from './SigInForm/SignIn'

import classes from './SignInPage.module.css'

export default function SignInPage() {
    return (
        <div className={classes.root}>
            <Header LandingPage={false} />
            <SignIn />
        </div>
    )

}
