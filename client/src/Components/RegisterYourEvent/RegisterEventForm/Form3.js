
import React, { useState, useRef, useContext } from 'react'
import axios from 'axios'


import EventContext from '../../../store/event-Context'
import AuthContext from '../../../store/auth-context'

import { Card, Form, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';



import classes from './RegisterEventForm.module.css'


export default function Form3(props) {


  const eventctx = useContext(EventContext)
  const authCtx = useContext(AuthContext)
  let token = authCtx.token
  const data = eventctx.eventData()



  const [btndisable, setBtnDisable] = useState(true)
  const [picture, setPicture] = useState("")
  const [docs, setdocs] = useState("")

  const doneHandler = (e) => {
    e.preventDefault()
    if (picture !== '' && docs !== '') {
      const Data = {
        picture: picture,
        docs: docs
      }
      eventctx.form3Data(Data)
    }
    setBtnDisable(false)
  }

  const DataSendHandler = async (e) => {
    e.preventDefault();
    toast.info('registering your event wait for some time')
    // window.location.reload(false);

    const formData = new FormData()

    for (const property in data) {

      formData.append(property, data[property])
    }


    try {

      let response = await axios.post('http://localhost:8000/createEvent', formData, { headers: { "Authorization": `Bearer ${token}`, 'My-Custom-Header': 'foobar' } })
      toast.info('registed successfully wait 1 bussiness day for an update')
    } catch (e) {
      toast.error('we could not registered you event')
    }

    window.location.assign('http://localhost:3000/Home')


  }



  const picHandler = e => {

    setPicture(e.target.files[0])
  }
  const docHandler = e => {

    setdocs(e.target.files[0])
  }
  return (

    <>
      <ToastContainer />
      <div className={classes.root}>

        <Card className={classes.container} >
          <h2 className={classes.title}>Da<span className={classes.span}>T</span>a</h2>
          <hr />
          <Card.Body>

            <Card.Text>
              <form >
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>choose a relevant picture for your Event to show customer</Form.Label>
                  <Form.Control type="file" onChange={picHandler} />
                </Form.Group>
                <Form.Group controlId="picture of your address proof" className="mb-3">
                  <Form.Label>picture of your address proof and AdharCard</Form.Label>
                  <Form.Control type="file" multiple onChange={docHandler} />
                </Form.Group>
                <div className={classes.np}>
                  <Button className={classes.button} onClick={props.previousStep}>
                    privious
                  </Button>
                  <Button className={classes.button} onClick={doneHandler}>
                    Done
                  </Button>
                  <Button type="button" className={classes.button} disabled={btndisable} onClick={(e) => { DataSendHandler(e) }}>
                    Submit
                  </Button>
                </div>
              </form>


            </Card.Text >

          </Card.Body >
        </Card >
      </div >
    </>


  )
}
