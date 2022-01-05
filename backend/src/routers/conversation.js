const Conversation = require('../models/Conversation')
const router = require('express').Router()
const auth = require("../middleware/auth")
const mongoose = require("mongoose")

//create new conversation

router.post("/startConversation", auth, async (req, res) => {


    const newConversation = new Conversation({
        members: [mongoose.Types.ObjectId(req.body.otherPerson), req.user._id]
    })
    try {

        const conversation = await Conversation.find({
            "$or": [
                { "members": [mongoose.Types.ObjectId(req.body.otherPerson), req.user._id] },
                { "members": [req.user._id, mongoose.Types.ObjectId(req.body.otherPerson)] }
            ]
        })

        console.log(conversation);
        console.log(conversation.length);
        if (conversation.length == 0) {


            const savedConversation = await newConversation.save();
            res.status(200).json(savedConversation)


        } else {

            res.status(200).json(conversation)

        }


    } catch (e) {

        res.status(500).send(e)
    }
})


//get conversation

router.get("/getConversation", auth, async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.user._id] }
        })

        res.status(200).send(conversation)
} catch (e) {
        res.status(500).send(e)
    }
})



module.exports = router