const userModel = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const redis = require("../config/cache");

const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (isUserAlreadyExist) {
    return res.status(400).json({ message: "User already exist" });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token, { httpOnly: true });
  return res
    .status(201)
    .json({
      message: "User created successfully",
      user: {
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        bio: user.bio,
      },
    });
};


const loginController = async (req,res)=>{
    const {username,email,password} = req.body

    const user = await userModel.findOne({
        $or:[{username:username},{email:email}]
    }).select("+password")

    if(!user){
        return res.status(404).json({message:"User not found"})
    }

    const isPasswordCorrect = await bcrypt.compare(password,user.password)

    if(!isPasswordCorrect){
        return res.status(400).json({message:"Invalid credentials"})
    }

    const token = jwt.sign({
        id:user._id,
        username:user.username,
        email:user.email
    },process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie('token',token,{httpOnly:true})
    return res.status(201).json({
        message:"User logged in successfully",
        user:{
            username:user.username,
            email:user.email,
            profileImage:user.profileImage,
            bio:user.bio
        }
    })
}


const getMeController = async (req,res)=>{
    const id = req.user.id
    const user = await userModel.findById(id)

    return res.status(200).json({
        message:"User fetched successfully",
        user
    })
}

const logoutController = async (req,res)=>{
    const token = req.cookies.token
    res.clearCookie("token")

    await redis.set(token,Date.now().toString(),"EX",60*60*24)

    res.status(200).json({
        message:"User logged out successfully"
    })
}

module.exports = {
    registerController,
    loginController,
    getMeController,
    logoutController
}