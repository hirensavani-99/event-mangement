import React from 'react'

import Form1 from './RegisterEventForm/Form1'
import Form2 from './RegisterEventForm/Form2'
import Form3 from './RegisterEventForm/Form3'



import NavBar from '../HomePage/NavBar/NavBar'

import StepWizard from "react-step-wizard";

import classes from './RegisterYourEvent.module.css'


export default function RegisterYourEvent() {


    return (

        <div className={classes.root}>


            <NavBar />

            <StepWizard isHashEnabled>
                <Form1 hashKey={"basic"} />
                <Form2 hashKey={"contact"} />
                <Form3 />
            </StepWizard>

        </div>

    )
}
