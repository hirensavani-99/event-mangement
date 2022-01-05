const express = require('express')
const router = require('express').Router()
const Events = require('../models/Events')
const auth = require('../middleware/auth')
const multer = require('multer')
const { response } = require('express')
const { update } = require('../models/Events')
const stripe = require('stripe')('sk_test_51K6yIdAy7KDVZHoT7CX1hKmThwL78dyydqCnZK3gVbTy234MVqbmTi5ZF1sbkg1tJhSHuToxQ0NAqaOH3JhxWnCd00bC8j5Yj5')
const { v4: uuidv4 } = require('uuid');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../client/public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })
//creating an event
router.post('/createEvent', auth, upload.fields([{ name: 'picture', maxCount: 1 }, { name: 'docs', maxCount: 1 }]), async (req, res) => {


    const Event = new Events({
        ...req.body,
        picture: req.files['picture'][0].originalname,
        docs: req.files['docs'][0].originalname,
        owner: req.user._id
    })

    console.log(Event);
    try {
        console.log('x');
        await Event.save()
        console.log('y');
        res.status(201).send(Event)
    } catch (e) {
        console.log(e);
        res.status(400).send(e)
    }
})

// get event where ad is to show
router.get('/getEventToAddvertise', async (req, res) => {
    try {
        let event;
        event = await Events.find({ seen: true, advertisement: true })



        res.status(200).send(event)
    } catch (e) {
        res.status(400).send(e)
    }
})


//getting allevents by seen
router.get('/getallEvents', auth, async (req, res) => {
    try {
        let event;
        if (req.user.isadmin) {
            event = await Events.find({ seen: false })
        } else {
            event = await Events.find({ seen: true })
        }


        res.status(200).send(event)
    } catch (e) {
        res.status(400).send(e)
    }
})

//geting all events

router.get('/getallEvents', auth, async (req, res) => {
    try {
        if (req.user.isadmin === true) {
            const event = await Events.find()
            res.status(200).send(event)

        }

    } catch (e) {
        res.status(400).send(e)
    }
})

//getting event by its id
router.get('/event/:id', auth, async (req, res) => {
    try {
        const event = await Events.findById(req.params.id)

        res.status(200).send(event)
    } catch (e) {
        res.status(400).send(e)
    }
})

//getting event by query eventName
router.get('/eventName', auth, async (req, res) => {

    try {
        const event = await Events.find({ eventName: req.query.eventName })

        res.status(200).send(event)
    } catch (e) {
        res.status(400).send(e)
    }
})

//getting an event by it's type
router.get('/eventType', auth, async (req, res) => {

    try {
        const event = await Events.find({ eventType: req.query.eventType })

        res.status(200).send(event)
    } catch (e) {
        res.status(400).send(e)
    }
})


//getting an event and update that

router.patch('/event/:id', auth, async (req, res) => {

    //what owner of the event want to modify 
    const wantToUpdate = Object.keys(req.body)

    const allowUpdate = [      // this are the property owner can modify
        'eventType', "eventName", "desc",
        "address", "numberOfPasses", "priceOfPass",
        "advertisement", "picture", "docs"]
    const isValidOperation = wantToUpdate.every(update => allowUpdate.includes(update)) // checking that every property falls in allowUpdate array

    if (!isValidOperation) {  // if wantoupdate is not in to allow update
        return res.status(406).send("what you are trying to do is not allowed!")
    }

    try {
        // find an event by its id and its owner
        const event = await Events.findOne({
            _id: req.params.id,
            owner: req.user._id
        })

        //if no such event is there
        if (!event) {
            return res.status(406).send('task is not available')
        }

        wantToUpdate.forEach((update) => {
            event[update] = req.body[update]
            // console.log(req.body[update]);

        })  // updating an event 
        await event.save()  // save that updated version of an event
        res.status(200).send(event)
    } catch (e) {
        console.log(e);
        return res.status(404).send(e)
    }
})

//admin edit event

router.patch('/admin/event/:id', auth, async (req, res) => {
    if (req.user.isadmin) {
        console.log(req.params.id);

        const wantToUpdate = Object.keys(req.body)   //what owner of the event want to modify 
        const allowUpdate = [      // this are the property owner can modify
            'eventType', "eventName", "desc",
            "address", "numberOfPasses", "priceOfPass",
            "advertisement", "picture", "docs", "seen"]
        const isValidOperation = wantToUpdate.every(update => allowUpdate.includes(update)) // checking that every property falls in allowUpdate array

        if (!isValidOperation) {  // if wantoupdate is not in to allow update

            return res.status(406).send("what you are trying to do is not allowed!")
        }

        try {
            // find an event by its id and its owner
            const event = await Events.findOne({
                _id: req.params.id
            })

            //if no such event is there
            if (!event) {
                return res.status(406).send('task is not available')
            }
            console.log(wantToUpdate);
            wantToUpdate.forEach((update) => {
                event[update] = req.body[update]
                console.log(req.body[update]);
            })  // updating an event 
            await event.save()  // save that updated version of an event

            res.status(200).send(event)
        } catch (e) {
            console.log(e);
            return res.status(404).send(e)
        }
    }
})


//delet by id
router.delete("/event/:id", auth, async (req, res) => {
    try {
        console.log('x');
        console.log(req.params.id);
        const event1 = await Events.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        })

        const event2 = req.user.admin && await Events.findOneAndDelete({
            _id: req.params.id,
        })

        const event = event1 || event2

        if (!event) {
            return res.status(400).send("no such a event exist!")
        }

        res.status(200).send('deleted successfully !')
    } catch (e) {
        res.status(400).send('not ')
    }
})

//implementing stripe api

router.post("/event/payment", auth, async (req, res) => {


    const { event, token } = req.body;
    const idempontencyKey = uuidv4()

    console.log(token.id);
    console.log(idempontencyKey);

    return stripe.customers.create({
        email: token.email,
        source: token.id
    })
        .then(customer => {
            stripe.charges.create(
                {
                    amount: event.priceOfPass * 100,
                    currency: 'usd',
                    customer: customer.id,
                    receipt_email: token.email,
                    description: `purchase of ${event.eventName} passes`,

                }, { idempotencyKey: idempotencyKey })
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => { res.status(400).json(err) })
})

module.exports = router