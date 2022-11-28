const mongoose = require ('mongoose');

const  userModelSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('modelUsers', userModelSchema);