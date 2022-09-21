require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors())
app.use(express.json());

const routes = require('./routes/routes');
app.use('/api', routes)

let _port = process.env.PORT ?? 4300;
app.listen(_port, () => {
    console.log(`Server Started at ${_port}`)
})