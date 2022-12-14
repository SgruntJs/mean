const express = require('express');
const  DiaryEntryModel = require('./entry-schema');
const MenuModel = require('./menu-schema');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const { find, update} = require('./entry-schema');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://username:password@cluster0.jqvxi6z.mongodb.net/diarydb?retryWrites=true&w=majority")
.then( () => {
    console.log('connected to mongo')
}).catch( () => {
    console.log('Error to conenct to MongoDb')
})

// retrieving data
diaryEntries = [
    {id: 1, date:"Jan 1st", entry: "Entry 1"},
    {id: 2, date:"march 1st", entry: "Entry 2"},
    {id: 3, date:"April 1st", entry: "Entry 3"}
  ];

  app.use(bodyParser.json());


  app.use( (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
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
    const updatedEntry = new DiaryEntryModel( {_id: req.body.id, date: req.body.date, entry: req.body.entry});
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
    diaryEntry.save()
    .then(() => {
        res.status(200).json({
            message: 'Post submitted'
        })
    });
    //diaryEntries.push({ id: req.body.id, date: req.body.date, entry: req.body.entry});
    
  });

  app.delete('/remove-menu/:id', (req, res) => {
    MenuModel.deleteOne({_id: req.params.id})
    .then( () => {
        res.status(200).json({
            message: 'Menu Deleted'
        })
    })     
  })

  app.put('/update-menu/:id', (req, res) => {
    const updatedMenu = new MenuModel( {
        _id: req.body._id, 
        giorno: req.body.giorno, 
        primo1: req.body.primo1,
        primo2: req.body.primo2,
        primo3: req.body.primo3,
        secondo1: req.body.secondo1,
        secondo2: req.body.secondo2,
        secondo3: req.body.secondo3,
    });
    MenuModel.updateOne({_id: req.body._id}, updatedMenu)
    .then(() => {
        res.status(200).json({
            message: 'post edited'
        })
    });
    
  })

  app.post('/add-menu', (req, res) => {
    const newMenu = new MenuModel( {
        giorno: req.body.giorno, 
        primo1: req.body.primo1,
        primo2: req.body.primo2,
        primo3: req.body.primo3,
        secondo1: req.body.secondo1,
        secondo2: req.body.secondo2,
        secondo3: req.body.secondo3,
    });

    newMenu.save()
    .then(() => {
        res.status(200).json({
            message: 'Post submitted'
        })
    });
    //diaryEntries.push({ id: req.body.id, date: req.body.date, entry: req.body.entry});
    
  });

// register a URI
app.get('/diary-entries',(req, res, next) => {
    DiaryEntryModel.find().then( (data) => {
        res.json({'diaryEntries': data});
    })
    
})

app.get('/menu-list', (req, res, next) => {
    MenuModel.find().then( data => {
        res.json({ 'menu': data});
    })
});

//provo a creare il sort
sortRecord = (req, res, next) => {
    try{
        MenuModel.find({}).sort({giorno: 1}).exec((err, docs) => {
            if(err) {
                responseObj = {
                    "status": "error",
                    "msg": "Error occured.",
                    "body": err
                }
                res.status(500).send(responseObj);
            }else{
                responseObj = {
                    "status": "success",
                    "msg": "Fetch record",
                    "body": docs
                }
                res.status(200).send(responseObj);
            }
        })
    }catch(error) {
        console.log('Error', error);
    }
}

app.get('/sortRecord',  sortRecord.bind());

module.exports = app;