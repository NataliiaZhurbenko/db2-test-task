var mongoose = require('mongoose');

// Setup schema
let  messageSchema = mongoose.Schema({
    author: {
      type: String,
      required: true
    },

    text: {
        type: String,
        required: true,
        validate: {
            validator: value => /^.{1,99}$/.test(value),
            message: props => `${props.value} is not a valid message text number! Please enter message with length > 0 and length < 100`
        },
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: value => /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value),
            message: props => `${props.value} is not a valid email!`
        },
    },
    create_date: {
        type: Date,
        default: Date.now
    },

    update_date: {
        type: Date
    }
});

let Message =  mongoose.model("message", messageSchema);

const perPage = 10;

Message.get = (callback, page) => {
    Message.find(callback).skip(perPage * page).limit(perPage);
};

module.exports  = Message;