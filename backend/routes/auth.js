const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authModelSchema = require('../models/authModel');
const secretKey = "fjihrwirheiu#@R$dnjf$%dkns@3nfwj4vsv";
const verifyToken = require('../verifyToken');

router.post('/login', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    await authModelSchema.findOne({username: username}).then( (existUser => {
        console.log('exist user', existUser);
        if(existUser && existUser._id) {
            bcrypt.compare(password, existUser.password, function(err, response){
                if(!err){
                    if(response){
                        const authToken = jwt.sign({_id: existUser._id, username: existUser.username}, secretKey, {
                            expiresIn: '1h'
                        })
                        res.json({status: 'ok', data:{ authToken, response, existUser} })
                    } else if (!responde){
                        res.json({status: 'ok', data: {existUser, response}})
                    }
                }
            })
        }
    })).catch( err => {
        res.json({status: 'error', data: 'something went wrong'})
    })
});

router.get('/aggiungi-menu', verifyToken, async(req, res) => {
    if(req && req.decodedToken) {
        res.json({ satus: 'ok', data: 'ok'})
    } else {
        res.json({ satus: 'error', data: 'error'})
    }
})

router.post('/register', async (req, res) => {
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
    await authModelSchema.create(registerUserData).then(userStoredData => {
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