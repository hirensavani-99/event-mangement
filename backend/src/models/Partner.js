const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')


//user schema 
const PartnerSchema = mongoose.Schema({
    OrganizationName: {
        type: String,
        require: true,
        min: 3,
        max: 50,
        unique: true
    },
    OrganizationId: {
        type: String,
        unique: true,
        min: 3,
        max: 50,
    },
    OrganizationAddress: {
        type: String,
        require: true
    },
    ContactPerson: {
        type: String,
        require: true,
        min: 3,
        max: 20,

    },
    contactEmail: {
        type: String,
        require: true,
        max: 50,
        unique: true
    },
    contactNumber: {
        type: String,
        require: true,
        min: 9,
        max: 15
    },
    password: {
        type: String,
        require: true,
        min: 7,
        max: 25
    },
    documents: {
        type: String,
        require: true
    },
    pictures: {
        type: String,
        require: true
    },
    rating: {
        type: String
    },
    isadmin: {
        type: Boolean,
        default: false
    },
    minGuest: {
        type: Number,
        default: 10,
        require: true,

    },
    maxGuest: {
        type: Number,
        default: 1000,
        require: true,

    },
    aboutYou: {
        type: String,
        require: true,
        min: 5,
        max: 50
    },
    basePrice: {
        type: Number,
        default: 300,
        require: true
    },
    city: {
        type: String,
        default: "surat"
    },
    seen: {
        type: Boolean,
        default: false
    },
    tokens: [{
        token: {                                              //Jwt token for auth
            type: String,

        }
    }]

}, {
    timestamps: true
})



//generating Jwt TOKEN
PartnerSchema.methods.generateToken = async function () {
    const Partner = this  //THIS reprenting current user

    const token = jwt.sign({ _id: Partner._id.toString() }, 'hirensavani');  //providing data for generate token hirensavani is secret
    Partner.tokens = Partner.tokens.concat({ token })
    await Partner.save()

    return token;
}

//creating method for help to login 
PartnerSchema.statics.findByCredentials = async (contactEmail, password) => {
    console.log(contactEmail);
    const partner = await Partner.findOne({ contactEmail })

    console.log(partner);
    if (!partner) {
        console.log('x');
        throw Error("id or password wrong")
    }

    if (partner.password !== password) {
        console.log('y');
        throw Error("id or password wrong")
    }

    return partner

}

//co
const Partner = mongoose.model('Partner', PartnerSchema)

//connecting schema with user model


module.exports = Partner;