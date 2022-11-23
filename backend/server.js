const http =  require('http');
const app = require('./rest.js');
const express = require('./rest.js');
const authRouter = require('./routes/auth');

app.use('/auth', authRouter);


const server  = http.createServer(express);

server.listen(3000);