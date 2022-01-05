const express = require('express')
const router = new express.Router()
const Users = require('../models/Users')
const auth = require("../middleware/auth")
const { sendWelcomeEmail, sendUserDeleteEmail } = require('../emails/accounts')

//customer registration
router.post('/users/register', async (req, res) => {
    const User = new Users({
        ...req.body
    })
    try {

        await User.save()
        sendWelcomeEmail(User.emailId, User.name)

        const token = await User.generateToken()
        res.status(201).send({ User, token })
    } catch (e) {
        console.log(e);
        res.status(400).send(e)
    }
})

//login 

router.post('/users/login', async (req, res) => {
    try {

        const user = await Users.findByCredentials(req.body.emailId, req.body.password)
        const token = await user.generateToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send('please check !! do you have account with us !')
    }
})

//logout
router.post('/user/logout', auth, async (req, res) => {

    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token = token
        })

        await req.user.save()
        res.status(200).send('suceessfully loggedout ! ')
    } catch (e) {
        res.status(400).send('there is a problem to logout')
    }
})


//logout all
router.post('/user/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send(200)
    } catch (e) {
        res.status(500).send(e)
    }
})

//get user by id

router.get("/user/:id", auth, async (req, res) => {
    try {
      
        const user = await Users.findById(req.params.id)
        console.log('dd');
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send("not found")
    }
})


//getting user 

router.get("/user/me", auth, async (req, res) => {
    res.status(200).send(req.user)
})


//update user 

router.put("/user/update", auth, async (req, res) => {
    const update = Object.keys(req.body)
    const allowUpdate = ['name', 'surename', 'location', 'contactNumber', 'emailId', 'password']
    const isValidOperation = update.every((update) => allowUpdate.includes(update))

    if (!isValidOperation) {
        return res.status(404).send({ error: "something went wrong !" })

    }
    try {
        update.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(404).send('something went wrong')
    }

})

//delete a user

router.delete('/user/me', auth, async (req, res) => {
    try {
        await req.user.remove()

        res.status(200).send('user has been delete')
    }
    catch (e) {
        res.status(400).send('there is problem to delete a ')
    }
})




module.exports = router
