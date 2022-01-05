const express = require('express')
const router = new express.Router()
const Partners = require('../models/Partner')
const multer = require('multer')
const auth = require("../middleware/auth")
const Partner = require('../models/Partner')


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
        console.log(partner);

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

//get user by id

router.get("/partner/:id", auth, async (req, res) => {
    try {
        const partner = await Partner.findById(req.params.id)
        res.status(200).send(partner)
    } catch (e) {
        res.status(400).send("not found")
    }
})

//get all partners

router.get("/getAllPartner", auth, async (req, res) => {

    try {
        if (req.user.isadmin === true) {
            const partner = await Partner.find({ seen: false })
            res.status(200).send(partner)

        }

    } catch (e) {
        console.log(e);
        res.status(400).send(e)
    }
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

router.patch("/partner/:id", auth, async (req, res) => {

    const wantToUpdate = Object.keys(req.body)
    const allowUpdate = ['OrganizationName', 'OrganizationId', 'OrganizationAddress', 'ContactPerson', 'contactEmail', 'contactNumber', 'password', 'documents', 'pictures', 'isadmin', 'seen', "city"]
    const isValidOperation = wantToUpdate.every(update => allowUpdate.includes(update)) // checking that every property falls in allowUpdate array

    if (!isValidOperation) {  // if wantoupdate is not in to allow update
        return res.status(406).send("what you are trying to do is not allowed!")
    }

    try {
        // find an event by its id and its owner
        const partner = await Partner.findOne({
            _id: req.params.id
        })

        //if no such event is there
        if (!partner) {
            return res.status(406).send('task is not available')
        }

        wantToUpdate.forEach((update) => {
            partner[update] = req.body[update]
            // console.log(req.body[update]);

        })  // updating an event 
        await partner.save()  // save that updated version of an event
        res.status(200).send(partner)
    } catch (e) {
        console.log(e);
        res.status(404).send('something went wrong')
    }

})


//delete a user

router.delete('/partner/delete/:id', auth, async (req, res) => {
    try {
        const partner = await Partner.findOneAndDelete({
            _id: req.params.id
        })

        res.status(200).send('user has been delete')
    }
    catch (e) {
        res.status(400).send('there is problem to delete a ')
    }
})


router.post('/findrelated', auth, async (req, res) => {
    try {
        const partner = await Partners.find({
            city: req.body.city,
            minGuest: { $lte: req.body.guest },
            maxGuest: { $gte: req.body.guest },
            basePrice: { $lte: req.body.basePrice }
        })

        console.log(partner);

        if (partner.length === 0) {

            return res.status(204).send('oops! no record found!')
        }

        return res.status(200).send(partner)
    } catch (e) {
        return res.status(400).send(e)
    }
})


module.exports = router