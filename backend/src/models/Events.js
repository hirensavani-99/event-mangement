const mongoose = require('mongoose')

//creating event schema
const EventSchema = mongoose.Schema({

    eventType: {
        type: String,
        enum: ["FestivalEvents", "Seminars", "Compition", "SocialEvents", "EducationalEvents", "ClubParty"],  //typeof event we are organizing
        //to sort event type
        // require: true,
    },
    eventName: {
        type: String,
        // min: 3,
        // max: 30,                                          //event name to identify the event
        // require: true
    },
    desc: {
        type: String,
        // min: 3,
        // max: 1000,                                     // description of event up to 1000 character
        // require: true
    },
    eventDate: {
        type: String,
        max: '20227-05-23',
        //  require: true
    },
    address: {
        type: String,
        // min: 10,
        // max: 100,                                       //address of event where it is going to  organized 
        // require: true
    },
    numberOfPasses: {
        type: Number,
        // require: true,
        // min: 20,                                            //how much passes thry want to sell on this platform
        // max: 10000
    },
    priceOfPass: {
        type: Number,
        require: true,                                      //price of a pass
        // min: 0,
        // max: 100
    },
    advertisement: {
        type: Boolean,                                       //if promotional then true or false
        default: false
    },
    picture: {
        type: String,
        //require: true
    },
    docs: {
        type: String                                            //need to find a way to store this 
    },
    owner: {                                                     //foreginkey which is conected to user document
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    seen: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})
EventSchema.virtual('eventPass', {
    ref: "EventPasses",                                //to deal with foreign key owner creating virtual schema
    localField: "_id",
    foreignField: "event"
})


//comnnecting schema with model
const Event = mongoose.model('event', EventSchema)

module.exports = Event