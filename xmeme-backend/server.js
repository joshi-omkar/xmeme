const express = require('express');
const mongoose = require("mongoose");
const app = express();
const memesRoute = require('./Routes/routes');
const userInfoRoutes = require('./Routes/userInfo');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv')
const path = require('path');

dotenv.config({path:path.resolve('./config.env')})

const PORT = process.env.PORT || 8081;
const DATABASE = process.env.DATABASE;


app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/memes', memesRoute);
app.use('/userInfo', userInfoRoutes);

app.get('/', (req, res) => {
    res.send('server is up and running');
})

mongoose.connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('DB is connected');
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});