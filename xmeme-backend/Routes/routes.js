const express = require("express");
const router = express.Router();
const Meme = require("../Models/entry");
const User = require('../Models/user')
const {protect} = require('../Middleware/authMiddleware')

// REST api to respond to GET req , responds with 100 latest memes if successful.
router.get("/", async (req, res) => {
  try {
    const memes = await Meme.find().limit(100).sort({ _id: -1 });
    res.status(200).json(memes);
  } catch (err) {
    res.status(500).type("txt").send("SERVER ERROR");
  }
});

// REST api to respond to Post req , responds with id of posted meme if successful.
router.post("/", protect, async (req, res) => {
  try {
    //handling the duplicate post req. returning 409, server conflict
    let exists = await Meme.exists({
      name: req.body.name,
      caption: req.body.caption,
      url: req.body.url,
    });
    if (exists) return res.status(409).type("txt").send("DUPLICATE");

    const meme = await Meme.create({
      user: req.user.id,
      name: req.body.name,
      caption: req.body.caption,
      url: req.body.url,
    });
    res.status(200).json(meme);
  } catch (err) {
    // will give a validation "not acceptable" error
    res.status(406).type("txt").send(err.message);
  }
});

// REST api to respond to GET req on /memes/:id , responds with specific meme acc to id if successful.
router.get("/:id", protect, async (req, res) => {
  try {
    const meme = await Meme.find({user: req.params.id})

    if(!meme){
      res.status(401)
      throw new Error("User not found")
    }

    res.status(200).json(meme);
  } catch (err) {
    res.status(404).type("txt").send(err.message);
  }
});

router.get("/:id/:memeId", protect, async (req, res) => {
  try {
    const meme = await Meme.findById({_id: req.params.memeId})
      const user = await User.findById(req.user.id)

      if(req.params.id !== user.id){
        res.status(401);
        throw new Error('User Not Matched')
      }

      if(!user ){
        res.status(401)
        throw new Error('User not found')
      }

      if(meme.user.toString() !== user.id ){
        res.status(401);
        throw new Error('User Not Matched')
      }

    res.status(200).json(meme);
  } catch (err) {
    res.status(404).type("txt").send(err.message);
  }
});

// REST api to respond to PATCH req , responds with 200 status if successful.
router.patch("/:id/:memeId", protect, async (req, res) => {
  try {
    
    const meme = await Meme.findById({_id: req.params.memeId})
      const user = await User.findById(req.user.id)

      if(req.params.id !== user.id){
        res.status(401);
        throw new Error('User Not Matched')
      }

      if(!user ){
        res.status(401)
        throw new Error('User not found')
      }

      if(meme.user.toString() !== user.id ){
        res.status(401);
        throw new Error('User Not Matched')
      }
    
      let response = await Meme.findByIdAndUpdate(
      { _id: req.params.memeId },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(404).type("txt").send("Can not update");
    console.log(err)
  }
});

// REST api to respond to DELETE req , responds with 200 status if successful
router.delete("/:id/:memeId",protect, async (req, res) => {
  try {
    const meme = await Meme.findById(req.params.memeId)
      const user = await User.findById(req.user.id)

      console.log(user)

      if(req.params.id !== user.id){
        res.status(401);
        throw new Error('User Not Matched')
      }
      if(!user ){
        res.status(401)
        throw new Error('User not found')
      }

      if(meme.user.toString() !== user.id){
        res.status(401);
        throw new Error('User Not Matched')
      }
    await meme.remove()
    res.status(200).json({id: req.params.id})
  } catch (err) {
    res.status(404).type("txt").send("Can Not Delete");
    console.log(err)
  }
});

module.exports = router;
