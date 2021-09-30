const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const cors = require('cors');
const Meme = require('./entry')
const dotenv = require('dotenv')

const app = express();

app.use(express.json());
app.use(bodyParser.json())
app.use(cors({
  origin: '*'
}));

dotenv.config({path:'./config.env'})

const DB = process.env.DATABASE
try {
    // Connect to the MongoDB cluster
     mongoose.connect(
      DB,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log("Mongoose is connected")
    );
  
  } catch (e) {
    console.log("could not connect");
  }

app.get('/',(req,res)=>{
    res.send('hello from backend');
})

app.get('/data',(req,res)=>{
    Meme.find({}).then(
        function(users){
          res.send(users)
        }
      )
      
})

app.post('/entry',(req,res)=>{
   const response = {
       name:req.body.name,
       caption:req.body.caption,
       url:req.body.url,
      
   }
   const meme = new Meme(response);
   meme.save()
   .then(()=>{
       res.status(200).json({message:"sucessful"})
   }).catch((err)=>res.status(500).json({message:"database problem"}))

   })

app.listen(8000, () => {
    console.log("Server is running at port 8000");
  });