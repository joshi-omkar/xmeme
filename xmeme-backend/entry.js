const mongoose = require('mongoose')

const memeSchema = new mongoose.Schema({

    name:{
        type:String,
        require:true,
    },

    caption:{
        type:String,
        require:true,
    },

    url:{
        type:String,
        unique:true,
    },

    

})

const Meme = mongoose.model("Meme", memeSchema);

module.exports = Meme;