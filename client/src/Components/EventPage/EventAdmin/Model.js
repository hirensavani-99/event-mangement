import React, { useEffect, useState, useContext } from 'react'
import FormModel from './FormModel'
import FormModel1 from './FormModel1'
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
            let url;
            props.partner ? url = `http://localhost:8000/partner/${props.id}` : url = `http://localhost:8000/event/${props.id}`
            const response = await axios.get(url, { headers: { "Authorization": `Bearer ${token}` } })
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
        e.preventDefault()
        let url;

        props.partner ? url = `http://localhost:8000/partner/${id}` : url = `http://localhost:8000/admin/event/${id}`
       
        console.log(url);
        try {

            const response = await axios.patch(url, dataToUpdate, { headers: { "Authorization": `Bearer ${token}` } })
            props.OnupdateHandler()
            setShow(false)

        } catch (e) {
            console.log(e);
        }

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
                    {!props.partner && <FormModel data={Event} onSaveupdatedData={saveUpdatedDataHandler} getId={getId} />}
                    {props.partner && <FormModel1 data={Event} onSaveupdatedData={saveUpdatedDataHandler} getId={getId} />}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} >
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit} >Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
