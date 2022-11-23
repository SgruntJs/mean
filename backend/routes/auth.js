const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authModelSchema = require('../models/authModel');

router.post('/login', (req, res) => {

});

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