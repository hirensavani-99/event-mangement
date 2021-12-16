const QRCode = require('qrcode')


const QrGenerator = async (data) => {

    let stringdata = JSON.stringify(data)
    try {
        return await QRCode.toDataURL(stringdata)
    } catch (err) {
        return console.log(err);
    }


}

module.exports = QrGenerator;