import React, { useContext, useEffect, useState } from 'react';
import AuthContex from '../../../store/auth-context';

import classes from './Conversations.module.css'
import logo from '../../../assets/user-anonymous.png'
import axios from 'axios';
function Conversations(props) {

    const authCtx = useContext(AuthContex)
    const token = authCtx.token
    const userName = authCtx.user.name
    const [person, setPerson] = useState({})
    const conversationMember = props.conversation.members[0] !== authCtx.user._id ? props.conversation.members[0] : props.conversation.members[1]

    console.log(userName);
    useEffect(() => {


        const getPerson = async () => {
            try {
                let url = ''
                !userName ? url = `http://localhost:8000/user/${conversationMember}` : url = `http://localhost:8000/partner/${conversationMember}`
                console.log(url);
                let res = await axios.get(url, { headers: { "Authorization": `Bearer ${token}` } })
                console.log(res);
                setPerson(res.data)

            } catch (e) {
                console.log(e);
            }
        }
        getPerson()
    }, [])


    return (
        <div className={classes.Conversation}>

            <img src={logo} alt="hsdfhiuds" className={classes.personpic} />
            <span className={classes.personName}>{userName ? person.OrganizationName : person.name}</span>
        </div>
    );
}


export default Conversations