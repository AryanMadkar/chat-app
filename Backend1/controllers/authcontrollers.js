import User from "../models/usermodel.js";
import bcryptjs from "bcryptjs";
import generatetoken from "../utils/generatetoken.js";
export const login = async (req, res) => {
  try {
    const {username, password} = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "user not found" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "password didnt match" });
    }
    generatetoken(user._id, res);
    res.status(200).json({
      _id: user._id,
      username: user.username,
      fullName: user.fullName,
      gender: user.gender,
      profilpic: user.profilpic,
      message: "user logged in",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "error from login part" });
  }
};

export const signin = async (req, res) => {
  try {
    const { fullName, username, password, confirmpassword, gender } = req.body;
    //creating appropriate conditions here
    if (password !== confirmpassword) {
      return res.status(400).json({ error: "password didnt match" });
    }
    if (password.length < 6) {
      res.status(403).json({ error: "password is too short" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "user already exists" });
    }

    //hashing here
    const salt = await bcryptjs.genSalt(10);
    const hashedpassword = await bcryptjs.hash(password, salt);

    //creating profile pic
    const boyprofilpic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlprofilpic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    //creating user here
    const newUser = new User({
      fullName,
      username,
      password: hashedpassword,
      gender,
      profilpic: gender === "male" ? boyprofilpic : girlprofilpic,
    });
    //saving the response
    if (newUser) {
      //jwt token here

      generatetoken(newUser._id, res);
      await newUser.save();
      //sending response here
      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        gender: newUser.gender,
        profilpic: newUser.profilpic,

        message: "user created successfully",
      });
    } else {
      return res.status(400).json({ error: "invalid user data" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "something went wrong at authcontroller" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({ message: "user logged out" });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "error from logout part" });
  }
};
