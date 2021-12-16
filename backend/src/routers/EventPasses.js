const express = require('express')
const router = new express.Router()
const Eventpasses = require('../models/Eventpasses')
const auth = require("../middleware/auth")
const stripe = require('stripe')('sk_test_51K6yIdAy7KDVZHoT7CX1hKmThwL78dyydqCnZK3gVbTy234MVqbmTi5ZF1sbkg1tJhSHuToxQ0NAqaOH3JhxWnCd00bC8j5Yj5')
const { v4: uuidv4 } = require('uuid');
const generateInvoice = require('../emails/Invoice')
const QrGenerator = require('../emails/QrCodes')
const { sendUserBuyPassEmail } = require('../emails/accounts')


//buy pass
router.post('/pass/buy/:id', auth, async (req, res) => {
    const EventPass = new Eventpasses({
        event: req.params.id,
        user: req.user._id,
        NumberOfPass: req.body.NumberOfPasses,
        Charged: req.body.Charged
    })
    const { event, token } = req.body;
    const idempontencyKey = uuidv4()

    //  console.log(req.user);

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        //console.log(customer);

        if (!customer) {
            return res.status(400).send("something went wrong")
        }
        const makeThemCharge = await stripe.charges.create(
            {
                amount: req.body.Charged * 100,
                currency: 'usd',
                customer: customer.id,
                receipt_email: token.email,
                description: `purchase of ${event.eventName} passes`,

            }, { idempotencyKey: idempontencyKey })

        if (!makeThemCharge) {
            return res.status(400).send("something went wrong")
        }

        const data1 = {
            "organizer": req.body.event._id,
            "eventName": req.body.event.eventName,
            "total pass": req.body.NumberOfPasses,
            "total paid": req.body.Charged,
            "place": req.body.event.address,
            "time": req.body.event.eventDate
        }


        const QrCode = await QrGenerator(data1)
        //  console.log(makeThemCharge);

         await generateInvoice(req.body.event, req.user, req.body.NumberOfPasses, QrCode);

        await EventPass.save()
        sendUserBuyPassEmail(token.email, req.user.name)
        res.status(201).send({ EventPass, makeThemCharge })
    } catch (e) {
        console.log(e);
        res.status(400).send(e)
    }
})


module.exports = router