const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const User = require("../Models/user");
const {protect} = require('../Middleware/authMiddleware')


const generateToken = (id)=>{

  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

}

router.post("/login", asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({email})

  if(user && (await bcrypt.compare(password, user.password))){
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  }else{
    res.status(400);
  throw new Error("Invaild data")
  }
}));

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });
console.log(userExist)
console.log(email)
    if (userExist) {
      res.status(400);
      throw new Error("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPass,

    });

    if(user){
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      }
      )
    }else{
      res.status(400);
      throw new Error("Invaild data")
    }

    // user.save((err) => {
    //   if (err) {
    //     res.send(err);
    //   } else {
    //     res.send({ message: "Successfully Registered, Please login now." });
    //   }
    // });
  })
);

router.get("/me", protect, asyncHandler(async(req, res) => {
  
  const {_id, name, email} = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email
  })

}));

module.exports = router;
