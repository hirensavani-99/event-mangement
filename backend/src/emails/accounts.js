const sgMail = require('@sendgrid/mail')


sgMail.setApiKey('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')



const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'hiren99savani@gmail.com',
        subject: 'Welcome to the make my event ',
        text: `Hello! ${name} Welcome the make my event .Let me know how you get along with the app.`
    })
    console.log('check you email ');
}

const sendUserDeleteEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'hiren99savani@gmail.com',
        subject: 'Sorry to see you go',
        text: `Goodbye ${name}. I hope to see you back sometime soon.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendUserDeleteEmail
}