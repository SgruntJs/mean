const express = require('express');

const bodyParser = require('body-parser');

const app = express();

// retrieving data


diaryEntries = [
    {id: 1,date:"Jan 1st", entry: "Entry 1"},
    {id: 2,date:"march 1st", entry: "Entry 2"},
    {id: 3,date:"April 1st", entry: "Entry 3"}
  ]
  app.use(bodyParser);

  app.post('/add-entry', (req, res) => {
    diaryEntries.push({ id: req.body.id, date: req.body.data, entry: req.body.entry});
    res.status(200).json({
        message: 'Post submitted'
    })
  })

  app.use( (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
  })

// register a URI
app.use('/diary-entries',(req, res, next) => {
    res.json({'diaryEntries': diaryEntries});
})

module.exports = app;