import React from 'react'
import StepWizard from "react-step-wizard";

import Header from '../LandingPage/Header/Header'

import Form0 from './Forms/Form0'
import Form1 from './Forms/Form1'
import Form2 from './Forms/Form2'
import Form3 from './Forms/Form3'

export default function Partner() {
    return (
        <div>
            <Header LandingPage={false} />
            <StepWizard isHashEnabled>

                <Form0 />
                <Form1 hashKey={"basic"} />
                <Form2 hashKey={"contact"} />
                <Form3 hashKey={"documents"} />
            </StepWizard>
        </div >
    )
}
