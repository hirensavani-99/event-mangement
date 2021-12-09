import React from 'react'

import Header from '../LandingPage/Header/Header'
import SignUpForm from './SignUpForm/SignUpForm'

export default function SignUpPage() {
    return (
        <div>
            <Header LandingPage={false} />
            <SignUpForm />
        </div>
    )
}
