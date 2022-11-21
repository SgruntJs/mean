const express = require('express');

const app = express();


app.use((req, res, next) => {
    res.send('ciao da express!');
})

module.exports = app;