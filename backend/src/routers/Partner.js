const express = require('express')
const router = new express.Router()
const Partners = require('../models/Partner')
const multer = require('multer')
const auth = require("../middleware/auth")


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../client/public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })
router.post('/partner/register', upload.fields([{ name: 'pictures', maxCount: 1 }, { name: 'documents', maxCount: 1 }]), async (req, res) => {
    const partner = new Partners({
        ...req.body,
        pictures: req.files['pictures'][0].originalname,
        documents: req.files['documents'][0].originalname,
    })
    try {

        await partner.save()
        //  sendWelcomeEmail(User.emailId, User.name)

        const token = await partner.generateToken()
        res.status(201).send({ partner, token })
    } catch (e) {
        console.log(e);
        res.status(400).send(e)
    }
})


//login partner


router.post('/Partner/login', async (req, res) => {
    try {

        const partner = await Partners.findByCredentials(req.body.contactEmail, req.body.password)
        const token = await partner.generateToken()
        res.status(201).send({ partner, token })
    } catch (e) {
        console.log(e);
        res.status(400).send(e)
    }
})

//getting user 
router.get("/partner/me", auth, async (req, res) => {
    console.log(req.user);
    res.status(200).send(req.user)
})



//logout
router.post('/partner/logout', auth, async (req, res) => {

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


//update partner

router.put("/partner/update", auth, async (req, res) => {
    const update = Object.keys(req.body)
    const allowUpdate = ['OrganizationName', 'OrganizationId', 'OrganizationAddress', 'ContactPerson', 'contactEmail', 'contactNumber','password','documents','pictures','isadmin','seen']
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