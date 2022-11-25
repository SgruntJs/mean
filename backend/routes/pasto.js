const express = require('express');
const router = express.Router();
const pastoModelSchema = require('../models/pastoModel');


router.post('/pasto', async(req, res) => {
    const pasto = new pastoModelSchema( {
        dataPasto: req.body.dataPasto, 
        user: req.body.user,
        primo: req.body.primo,
        secondo: req.body.secondo
    });
    pasto.save()
    .then(() => {
        res.status(200).json({
            message: 'Pasto submitted'
        })
    });
});

// register a URI
router.get('/pasti-prenotati',(req, res, next) => {
    pastoModelSchema.find().then( (data) => {
        res.json({'pasti': data});
    })
    
})

module.exports = router;