var easyinvoice = require('easyinvoice');
var fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const generateInvoice = async (event, user, NumberOfPass, QrCode) => {


    const data = {
        //"documentTitle": "RECEIPT", //Defaults to INVOICE
        "currency": "USD",
        "taxNotation": "vat", //or gst
        "marginTop": 25,
        "marginRight": 25,
        "marginLeft": 25,
        "marginBottom": 25,
        //"logo": QrCode, //or base64
        //"logoExtension": "png", //only when logo is base64
        "sender": {
            "company": "EventEve",
            "address": event.address,
            "zip": "",
            "city": "",
            "country": "",
            "custom1": "custom value 1",
            //"custom2": "custom value 2",
            //"custom3": "custom value 3"
        },
        "client": {
            "company": user.name,
            "address": user.emailId,
            "zip": "",
            "city": "",
            "country": "",
            "custom2": `<img src=${QrCode} />`,

        },
        "invoiceNumber": uuidv4(),
        "invoiceDate": new Date(),
        "products": [
            {
                "quantity": NumberOfPass,
                "description": event.eventName,
                "tax": 0,
                "price": event.priceOfPass
            }
        ],
        "bottomNotice": "Thank you for taking part of celebrations"
    };


    const result = await easyinvoice.createInvoice(data);

    await fs.writeFileSync("invoice.pdf", result.pdf, 'base64');

}

module.exports = generateInvoice