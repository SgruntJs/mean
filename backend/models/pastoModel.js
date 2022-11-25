const mongoose = require ('mongoose');

const  pastoModelSchema = new mongoose.Schema({
    dataPasto: {
        type: Date,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    primo: {
        type: String,
        required: true
    },
    secondo: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('pasto', pastoModelSchema);