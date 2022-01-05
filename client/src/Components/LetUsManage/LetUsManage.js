import React, { useState } from 'react'
import NavBar from '../HomePage/NavBar/NavBar'

import Form from './Form/Form'
import ShowRelated from './ShowRelated/ShowRelated'
import classes from './LetUsManage.module.css'
export default function LetUsManage() {

    const [data, setData] = useState(null)

    const searchHandler = (partners) => {
        setData(partners)
    }

    return (
        <div className={classes.root0}>
            <NavBar />
            {!data && <Form onSearchHandler={searchHandler} />}
            <div className={classes.root} >
                {data && data.map(partner1 => (<ShowRelated partner={partner1} />))}
            </div>

        </div >
    )
}
