const express = require('express');
const mongoose = require("mongoose");
const app = express();
const memesRoute = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})

//Defaults as per project requirements
const PORT = process.env.PORT || 8081;
const DATABASE = process.env.DATABASE;


//middleweres******************/
//cors
app.use(cors());

//bodyparser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//routes
app.use('/memes', memesRoute);

//***********************************/

//server home
app.get('/', (req, res) => {
    res.send('server is up and running');
})

//-------------------------------

//DB Connection
mongoose.connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('DB is connected');
});

//server port deployment
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});