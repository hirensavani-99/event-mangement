import React, { useState } from 'react'

import Alert from 'react-bootstrap/Alert'


export default function AlertToShow(props) {

    const [show, setShow] = useState(props.description ? true : false)
    return (
        props.description && <Alert variant="danger" >
            {props.description}
        </Alert>
    )
}
