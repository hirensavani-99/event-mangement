const sgMail = require('@sendgrid/mail')
const fs = require("fs");
const path = require('path')


sgMail.setApiKey('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')



const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'hiren99savani@gmail.com',
        subject: 'Welcome to the make my event ',
        text: `Hello! ${name} Welcome to EventEve.Thank you for registering your account with us.Book your first event with EventEve and let us know how was your experience with EventEve.`
    })

}

const sendUserDeleteEmail = (email, name) => {

}

const sendUserBuyPassEmail = (email, name) => {


    pathToAttachment = path.join(__dirname, '../../invoice.pdf');

    attachment = fs.readFileSync(pathToAttachment).toString("base64");


    sgMail.send({
        to: email,
        from: 'hiren99savani@gmail.com',
        subject: 'Confirmation',
        text: `Thank you  ${name} for taking part in to fest.I hope you will enjoy.`,

        attachments: [
            {
                content: attachment,
                filename: "attachment.pdf",
                type: "application/pdf",
                disposition: "attachment"
            }
        ]
    })



}


const sendBuyPassEmail = (email, name) => {

}
module.exports = {
    sendWelcomeEmail,
    sendUserDeleteEmail,
    sendUserBuyPassEmail
}