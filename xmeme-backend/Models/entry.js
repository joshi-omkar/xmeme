const mongoose = require('mongoose');
const MemeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: false
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require : true,
        ref: 'userdata'
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
    }]
},{
    timestamps: true,
});

module.exports = mongoose.model('Memes', MemeSchema);
