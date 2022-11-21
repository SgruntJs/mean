const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    giorno: String,
    primo1: String,
    primo2: String,
    primo3: String,
    secondo1: String,
    secondo2: String,
    secondo3: String
});

module.exports = mongoose.model('MenuEntry', menuSchema );