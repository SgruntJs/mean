const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
    data: String,
    entry: String
});

module.exports = mongoose.model('DiaryEntry', entrySchema );