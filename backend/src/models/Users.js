const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')


//user schema 
const UsersSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    surename: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    contactNumber: {
        type: String,
        require: true
    },
    emailId: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    isadmin: {
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
UsersSchema.virtual('event', {
    ref: "Events",                                //to deal with foreign key owner creating virtual schema
    localField: "_id",
    foreignField: "owner"
})

UsersSchema.virtual('eventpass', {
    ref: "EventPasses",                                //to deal with foreign key owner creating virtual schema
    localField: "_id",
    foreignField: "user"
})



//generating Jwt TOKEN
UsersSchema.methods.generateToken = async function () {
    const User = this  //THIS reprenting current user

    const token = jwt.sign({ _id: User._id.toString() }, 'hirensavani');  //providing data for generate token hirensavani is secret
    User.tokens = User.tokens.concat({ token })
    await User.save()

    return token;
}

//creating method for help to login 
UsersSchema.statics.findByCredentials = async (emailId, password) => {
    const user = await User.findOne({ emailId })

    if (!user) {
        throw Error("id or password wrong")
    }

    if (user.password !== password) {
        throw Error("id or password wrong")
    }

    return user



}

//connecting schema with user model
const User = mongoose.model('User', UsersSchema)

module.exports = User;