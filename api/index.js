const express = require('express');
const cors = require('cors');
const http = require('http');

const PORT = process.env.PORT || 4000;

const router = require('./router');

const app = express();
const server = http.createServer(app);


app.use(router);
app.use(cors())
server.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})