const express = require('express');
const  DiaryEntryModel = require('./entry-schema');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const { find } = require('./entry-schema');

const app = express();
mongoose.connect("mongodb+srv://admin:cicciomerda1@cluster0.jqvxi6z.mongodb.net/diarydb?retryWrites=true&w=majority")
.then( () => {
    console.log('connected to mongo')
}).catch( () => {
    console.log('Error to conenct to MongoDb')
})

// retrieving data
diaryEntries = [
    {id: 1,date:"Jan 1st", entry: "Entry 1"},
    {id: 2,date:"march 1st", entry: "Entry 2"},
    {id: 3,date:"April 1st", entry: "Entry 3"}
  ];

  app.use(bodyParser.json());


  app.use( (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  });

  app.get('/max-id', (req, res) => {
    var max = 0;
     for (var i = 0; i < diaryEntries.length; i++) {
        if(diaryEntries[i].id > max) {
            max = diaryEntries[i].id;
        }
     }
     res.json({maxId: max});
  });

  app.delete('/remove-entry/:id', (req, res) => {
    DiaryEntryModel.deleteOne({_id: req.params.id})
    .then( () => {
        res.status(200).json({
            message: 'Post Deleted'
        })
    })
        // const index = diaryEntries.findIndex( el => {
        //     return el.id == req.params.id;
        // });
        // diaryEntries.splice(index, 1);
      
  })

  app.put('/update-entry/:id', (req, res) => {
    const updatedEntry = new DiaryEntryModel( {date: req.body.date, entry: req.body.entry});
    // const index = diaryEntries.findIndex( el => {
    //     return el.id == req.params.id;
    // });
    // diaryEntries[index] = {id: req.body.id, date: req.body.date, entry: req.body.entry};
    DiaryEntryModel.updateOne({_id: req.body.id}, updatedEntry)
    .then(() => {
        res.status(200).json({
            message: 'post edited'
        })
    });
    
  })

  app.post('/add-entry', (req, res) => {
    const diaryEntry = new DiaryEntryModel( {date: req.body.date, entry: req.body.entry});
    console.log(diaryEntry);
    diaryEntry.save();
    diaryEntries.push({ id: req.body.id, date: req.body.date, entry: req.body.entry});
    res.status(200).json({
        message: 'Post submitted'
    })
  });

// register a URI
app.get('/diary-entries',(req, res, next) => {
    DiaryEntryModel.find().then( (data) => {
        res.json({'diaryEntries': data});
    })
    
})

module.exports = app;