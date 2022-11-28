const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModelSchema = require('../models/userModel');
const secretKey = 'fjihrwirheiu#@R$dnjf$%dkns@3nfwj4vsv';
// const secretKey = "sZlB8/BoHRn7QoQoLrhET+Yu2bHIDi4eJyYEcHTqzp2QlyOW9LTO1Fwuw0tr/XG2jXvPy4c/GVG2H7RZLCXKMY8rhTaOtl3PpC5hIckmOSVDlHX/nVBXQ+rcoGr8Bvlo2o6fcpLkKngxG5RX0OrCrfeNiy1CyiqFcYdbaFZt1XKyQ30aq5vn2GuyNixaDMn6gOZQAacqJU7VGjcpvZWf+Cm+tUMpFmZ+qYsybDfa7dBvdTlUcB3agONiqQNwb7lCHlECkEbXf9iTeT0iGxo04SCaMuk6CcZccIR5+IPppfuAg2jis7f/rZHjJBl2GltVNs3ev41INk6qJonQpttv0w==";
const verifyToken = require('../verifyToken');

router.post('/diner-login', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    await userModelSchema.findOne({username: username}).then( (existUser => {
        console.log('exist user', existUser);
        if(existUser && existUser._id) {
            bcrypt.compare(password, existUser.password, function(err, response){
                if(!err){
                    if(response){
                        const authToken = jwt.sign({_id: existUser._id, username: existUser.username}, secretKey, {
                            expiresIn: '1h'
                        })
                        res.json({status: 'ok', data:{ authToken, response, existUser} })
                    } else if (!response){
                        res.json({status: 'ok', data: {existUser, response}})
                    }
                }
            })
        }
    })).catch( err => {
        res.json({status: 'error', data: 'something went wrong'})
    })
});

router.post('/register-diner', async (req, res) => {
    const registerUserData = {
        username: req.body.username,
        password: req.body.password
    }
    const salt = await bcrypt.genSalt(10);
    await bcrypt.hash(req.body.password, salt).then(hashedPasword => {
        if (hashedPasword) {
            console.log('hashed password', hashedPasword);
            registerUserData.password = hashedPasword;
        }
    })
    await userModelSchema.create(registerUserData).then(userStoredData => {
        if (userStoredData && userStoredData._id) {
            console.log('user stored data', userStoredData);
            res.json({ status: 'ok', data:  userStoredData})
        }
    }).catch(err => {
        if (err) {
            res.json({ status: 'error', data: err })
        }
    })
});




module.exports = router;