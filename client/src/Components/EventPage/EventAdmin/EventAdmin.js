import React, { useContext, useEffect, useState } from 'react';
import Modal from './Model'
import axios from 'axios'
import { Table } from 'reactstrap';
import EditIcon from '@material-ui/icons/Edit';
import DeletetIcon from '@material-ui/icons/Delete';
import AuthContex from '../../../store/auth-context'

import classes from './EventAdmin.module.css'
const EventAdmin = (props) => {

    const authCtx = useContext(AuthContex)
    let token = authCtx.token

    const [change, setChange] = useState(false)
    useEffect(() => { }, [change])
    const deleteHandler = async (e) => {
        let id = e.currentTarget.id
        let url;
        props.partner ? url = `http://localhost:8000/partner/delete/${id}` : url = `http://localhost:8000/event/${id}`
        setChange(!change)

        try {
            const data = await axios.delete(url, { headers: { "Authorization": `Bearer ${token}` } })
            props.onUpdateData()
        }
        catch (e) {

        }


    }

    return (


        <Table Table Table hover className={classes.root} >

            {props.partner && <thead>
                <tr >
                    <th>OrganizationName</th>
                    <th>ContactPerson</th>
                    <th>contactEmail</th>
                    <th>contactNumber</th>
                    <th>city</th>
                    <th>documents</th>
                    <th>seen</th>
                </tr>
            </thead>}

            {props.partner && <tbody>
                {
                    props.partner.map(patner => (
                        <tr key={patner._id}>
                            <th scope="row">{patner.OrganizationName}</th>
                            <td>{patner.ContactPerson}</td>
                            <td>{patner.contactEmail}</td>
                            <td>{patner.contactNumber}</td>
                            <td>{patner.city}</td>
                            <td>{patner.documents}</td>
                            <td>{patner.seen ? 'Yes' : 'No'}</td>
                            <Modal className={classes.editIcon} partner={true} id={patner._id} OnupdateHandler={props.onUpdateData} />
                            <DeletetIcon className={classes.editIcon} id={patner._id} onClick={deleteHandler} />


                        </tr>
                    ))
                }


            </tbody>}


            {props.events && <thead>
                <tr >
                    <th>id</th>
                    <th>userId</th>
                    <th>event</th>
                    <th>total pass</th>
                    <th>price per pass</th>
                    <th>docs</th>
                    <th>seen</th>
                    <th>advertisement</th>


                </tr>
            </thead>}
            {props.events &&
                <tbody>
                    {
                        props.events.map(event => (
                            <tr key={event._id}>
                                <th scope="row">{event._id}</th>
                                <td>{event.owner}</td>
                                <td>{event.eventName}</td>
                                <td>{event.numberOfPasses}</td>
                                <td>{event.priceOfPass}</td>
                                <td>{event.docs}</td>
                                <td>{event.seen ? 'Yes' : 'No'}</td>
                                <td>{event.advertisement ? 'Yes' : 'No'}</td>
                                <Modal className={classes.editIcon} id={event._id} OnupdateHandler={props.onUpdateData} />
                                <DeletetIcon className={classes.editIcon} id={event._id} partner={false} onClick={deleteHandler} />


                            </tr>
                        ))
                    }


                </tbody>}
        </Table >


    );
}

export default EventAdmin;