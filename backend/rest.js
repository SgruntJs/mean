const express = require('express');

const app = express();

// retrieving data


diaryEntries = [
    {id: 1,date:"Jan 1st", entry: "Entry 1"},
    {id: 2,date:"march 1st", entry: "Entry 2"},
    {id: 3,date:"April 1st", entry: "Entry 3"}
  ]

// register a URI
app.use('/diary-entries',(req, res, next) => {
    res.json({'diaryEntries': diaryEntries});
})

module.exports = app;