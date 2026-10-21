
import { OAuth2Client } from "google-auth-library";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google Login
const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Google token is required",
      });
    }

    // Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email || !payload.sub) {
      return res.status(401).json({
        success: false,
        message: "Invalid Google token",
      });
    }

    const { sub, email, name } = payload;

    // Find existing user
    let user = await User.findOne({ email });

    // Create new user if not found
    // if (!user) {
    //   user = await User.create({
    //     name: name || "Google User",
    //     email,
    //     googleId: sub,
    //   });
    if (!user) {
  user = await User.create({
    userName: name || "Google User",
    email,
    googleId: sub,
  });
    } else if (user.googleId && user.googleId !== sub) {
      return res.status(401).json({
        success: false,
        message: "Google account verification failed",
      });
    }

    // Generate JWT token
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing in .env");
    }

    const jwtToken = jwt.sign(
      { user: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Google login successful",
      user,
      token: jwtToken,
    });
  } catch (error) {
    console.error("Google Login Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Google login failed",
    });
  }
};

// Get Profile
const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error("Get Profile Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};


export { googleLogin, getProfile };


















































// import { OAuth2Client } from "google-auth-library";
// import User from "../models/userModel";
// import jwt from "jsonwebtoken";

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

// const googleLogin = async (req, res) => {
//     try {
//         const { token }= req.body

//         const ticket = await client.verifyIdToken({
//             idToken:token,
//             audience:process.env.GOOGLE_CLIENT_ID
//         })

//         const payload = ticket.getPayload();
//         const {sub, email, name} = payload;
//         let user = await User.findOne({email});
//         if (!user) {
//             user = await User.create({
//                 name,
//                 email,
//                 googleId:sub
//             });
//         }

//         const jwtToken = jwt.sign({user:user._id},process.env.GOOGLE_CLIENT_ID,{
//             expiresIn:"7d"
//         });

//         return res.status(200).send({
//             success:true,
//             user,
//             token:jwtToken,
//             message:"Google Token Verified",
//             body:req.body,
//         });

//     } catch(error) {
//         return res.status(500).send({
//             success:false,
//             message:"Google Login Failed"
//         })
//     }
// };


// const getProfile = async (req,res) => {
//     res.status(200).send(req.user);
// }


// module.exports = {googleLogin, getProfile, };


