import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import passport from "passport"
import {google} from "googleapis"
const {OAuth2} = google.auth;
// import fetch from 'node-fetch';

const CLIENT_ID="522691258935-pb39b7654oj0t45qo7na4u296g35qkc9.apps.googleusercontent.com"

const client = new OAuth2(process.env.CLIENT_ID)

// const {CLIENT_URL} = process.env

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@description     login qith google
//@route           POST /api/google_login/
//@access          Public

const googleLogin = async(req, res) => {
  try {
      const {tokenId} = req.body

      const verify = await client.verifyIdToken({idToken: tokenId, audience: CLIENT_ID})
      
      console.log(req.body);
      console.log(verify);
      const {email_verified, email, name, picture} = verify.payload

      const password = email + process.env.GOOGLE_SECRET

      const passwordHash = await bcrypt.hash(password, 12)

      if(!email_verified) return res.status(400).json({msg: "Email verification failed."})

      const user = await User.findOne({email})

      if(user){
          const isMatch = await bcrypt.compare(password, user.password)
          if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

          const refresh_token = createRefreshToken({id: user._id})
          res.cookie('refreshtoken', refresh_token, {
              httpOnly: true,
              path: '/user/refresh_token',
              maxAge: 7*24*60*60*1000 // 7 days
          })

          res.json({msg: "Login success!"})
      }else{
          const newUser = new User({
              name, email, password: passwordHash, avatar: picture
          })

          await newUser.save()
          
          const refresh_token = createRefreshToken({id: newUser._id})
          res.cookie('refreshtoken', refresh_token, {
              httpOnly: true,
              path: '/user/refresh_token',
              maxAge: 7*24*60*60*1000 // 7 days
          })

          res.json({msg: "Login success!"})
      }


  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
};

/*
Route     /google
Des       Google Signin
Params    none
Access    Public
Method    GET  
*/

const googleSignin = asyncHandler(async (req, res) => {
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
})


//@description     Register new user
//@route           POST /api/users/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

/*
Route     /google/callback
Des       Google Signin Callback
Params    none
Access    Public
Method    GET  
*/

const googleCallback = asyncHandler(async (req, res) => {
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    return res.redirect(
      `http://localhost:3000/google/${req.session.passport.user.token}`
    );
  }
});

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

export { authUser,googleLogin,googleSignin, googleCallback, updateUserProfile, registerUser };
