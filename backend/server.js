const http =  require('http');
const app = require('./rest.js');
const express = require('./rest.js');
const authRouter = require('./routes/auth');
const pastoRouter = require('./routes/pasto');
const cors = require('cors');

app.use(cors());
app.use('/auth', authRouter);
app.use('/pasto', pastoRouter);


const server  = http.createServer(express);

server.listen(3000);