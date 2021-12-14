import React, { useEffect, useState, useContext } from 'react'
import FormModel from './FormModel'
import axios from 'axios'
import AuthContex from '../../../store/auth-context'
import { ModalDialog, Button, Modal } from 'react-bootstrap'
import EditIcon from '@material-ui/icons/Edit';
import classes from './EventAdmin.module.css'

export default function Editing(props) {

    const authCtx = useContext(AuthContex)
    let token = authCtx.token
    const [show, setShow] = useState(false);
    const [Event, setEvent] = useState({})
    const [dataToUpdate, setDataToUpdate] = useState({})
    const [id, setid] = useState('')

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(`http://localhost:8000/event/${props.id}`, { headers: { "Authorization": `Bearer ${token}` } })
            console.log('run');
            setEvent(response.data)
        }

        getData()

    }, [props.id, show])

    const getId = (id) => {
        setid(id)
    }
    const saveUpdatedDataHandler = (data) => {
        setDataToUpdate(data)
    }

    const handleSubmit = async (e) => {
        // console.log(dataToUpdate);
        const response = await axios.patch(`http://localhost:8000/admin/event/${id}`, dataToUpdate, { headers: { "Authorization": `Bearer ${token}` } })
        setShow(false)

    }


    const handleClose = () => setShow(false);
    const editeHandler = () => setShow(true);


    return (
        <>
            <EditIcon onClick={editeHandler} className={classes.editIcon} />


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header closeButton>
                    <Modal.Title>change data here watever you want to change</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormModel data={Event} onSaveupdatedData={saveUpdatedDataHandler} getId={getId} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} >
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit} >Understood</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
