import React, { useState, useContext } from 'react'
import Card from 'react-bootstrap/Card'
import { Button } from 'react-bootstrap'
import Modal1 from './Modal'
import axios from 'axios'
import AuthContex from '../../../store/auth-context'

import classes from './ShowRelated.module.css'

export default function ShowRelated(props) {
    const [modalShow, setModalShow] = useState(false)
    const [eventData, setEventData] = useState({})

    const authCtx = useContext(AuthContex)
    let token = authCtx.token


    const handleCard = async (e) => {
        e.preventDefault();
        console.log(e.currentTarget.id);
        const data = await axios.get(`http://localhost:8000/partner/${e.currentTarget.id}`, { headers: { "Authorization": `Bearer ${token}` } })
        setEventData(data.data)
        setModalShow(true)
    }


    return (
        <div key={props.partner._id} className={classes.root}>
            <Card style={{ width: '18rem', height: '21rem' }}>
                <Card.Img variant="top" src={`/uploads/${props.partner.pictures}`} />
                <Card.Body>
                    <Card.Title className={classes.dark} >{props.partner.OrganizationName ? props.partner.OrganizationName.slice(0, 20) : ''}</Card.Title>
                    <Card.Text>
                        <span className={classes.dark}>About event : </span>
                        {props.partner.aboutYou ? props.partner.aboutYou.slice(0, 50) + '...more' : ''}
                    </Card.Text>
                </Card.Body>

                <Card.Body className={classes.links}>

                    <Button className={classes.button} id={props.partner._id} onClick={handleCard}>Check More </Button>
                </Card.Body>
                <Modal1 show={modalShow}
                    data={eventData}
                    onHide={() => setModalShow(false)} />

            </Card>

        </div >
    )
}
