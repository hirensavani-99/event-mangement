const mongoose = require('mongoose')

//creating event schema
const EventPassesSchema = mongoose.Schema({

    event: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    NumberOfPass: {
        type: Number,
        require: true
    },
    Charged: {
        type: Number
    }
}, {
    timestamps: true
})

//comnnecting schema with model
const Eventpasses = mongoose.model('eventpasses', EventPassesSchema)

module.exports = Eventpasses