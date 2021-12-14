import React, { useContext } from 'react';
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

    const deleteHandler = async (e) => {
        let id = e.currentTarget.id

        const data = await axios.delete(`http://localhost:8000/event/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        console.log(data);
    }

    return (
        <Table hover className={classes.root}>

            <thead>
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
            </thead>
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
                            <Modal className={classes.editIcon} id={event._id} />
                            <DeletetIcon className={classes.editIcon} id={event._id} onClick={deleteHandler} />


                        </tr>
                    ))
                }


            </tbody>
        </Table>
    );
}

export default EventAdmin;