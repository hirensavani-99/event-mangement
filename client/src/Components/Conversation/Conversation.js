import React, { useContext, useEffect, useRef, useState } from 'react';
import NavBar from '../HomePage/NavBar/NavBar';
import Conversations from './Conversations.js/Conversations';
import Message from './Message/Message'
import AuthContex from '../../store/auth-context'
import classes from './Conversation.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { io } from "socket.io-client";


function Messanger(props) {




    const [conversation, setConversation] = useState([])
    const [chat, setchat] = useState(null)
    const [message, setMessage] = useState({})
    const [addmessage, setAddMessage] = useState("")
    const [arrivalMessage, setArraivalMessage] = useState(null)
    const [onLineUser, SetOnlineUsers] = useState([])

    const authctx = useContext(AuthContex)
    const token = authctx.token
    const scrollRef = useRef()
    const socket = useRef()



    useEffect(() => {
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMessage", data => {
            setArraivalMessage({
                sendId: data.userId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [])

    useEffect(() => {
        arrivalMessage && chat?.members.includes(arrivalMessage.sendId) &&
            setMessage(prev => [...prev, arrivalMessage])
    }, [arrivalMessage])

    useEffect(() => {
        socket.current.emit("addUser", authctx.user._id)

        socket.current.on("getUser", users => {
            SetOnlineUsers(users)
        })
    }, [authctx.user])

    //done
    useEffect(() => {
        const fetchConversation = async () => {
            try {
                const res = await axios.get("http://localhost:8000/getConversation", { headers: { "Authorization": `Bearer ${token}` } })
                setConversation(res.data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchConversation()

    }, [])


    useEffect(() => {
        const fetchMessage = async () => {
            try {
                console.log(chat._id);
                const res = await axios.get(`http://localhost:8000/api/message/${chat._id}`, { headers: { "Authorization": `Bearer ${token}` } })
                console.log(res.data);
                setMessage(res.data)
                console.log('g');
            }
            catch (e) {
                console.log(e);
            }
        }
        fetchMessage()
    }, [chat?._id])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [message])

    const messageHandler = async (e) => {
        e.preventDefault();

        const newmessage = {
            sendId: authctx.user._id,
            text: addmessage,
            conversationId: chat._id
        }
        console.log(chat);
        const receiverId = chat.members.find(
            (member) => member !== authctx.user._id
        )
        console.log(receiverId);

        socket.current.emit("sendMessage", {
            userId: authctx.user._id,
            receiverId,
            text: addmessage
        })

        try {
            const res = await axios.post('http://localhost:8000/api/message/', newmessage,
                { headers: { "Authorization": `Bearer ${token}` } })
            let responded = res.data
            setMessage([...message, responded])
            setAddMessage("")
        } catch (e) {
            console.log(e);
        }
    }

    console.log(Object.keys(message).length);

    return (
        <React.Fragment>
            <NavBar />
            <div className={classes.messanger}>
                <div className={classes.chatMenu}>
                    <div className={classes.chatMenuWrapper}>

                        <h4 className={classes.widget_title}>Friends</h4>
                        <input placeholder="Search for friends" className={classes.chatMenuInput} />
                        {conversation.map(con => (
                            <div onClick={() => setchat(con)}>
                                <Conversations conversation={con} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={classes.chatBox}>
                    <div className={classes.chatBoxWrapper}>
                        {chat ?
                            <>
                                <div className={classes.chatBoxTop}>
                                    {Object.keys(message).length !== 0 ? message.map((mes) => (
                                        <div ref={scrollRef}>
                                            <Message message={mes} own={mes.sendId === authctx.user._id} />
                                        </div>
                                    )) : (<h1>start chatting</h1>)
                                    }
                                </div>

                                <div className={classes.chatBoxBottom}>
                                    <textarea
                                        onChange={(e) => setAddMessage(e.target.value)}
                                        value={addmessage}
                                        placeholder="message..."
                                        className={classes.chatmessageInput}></textarea>
                                    <button className={classes.sendButton}
                                        onClick={messageHandler}>send</button>
                                </div>
                            </> : <span className={classes.NoConversation}>what are you waiting for ? Start chat!</span>}
                    </div>
                </div>


            </div>
        </React.Fragment >
    );
}


export default Messanger;