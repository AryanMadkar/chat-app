import dotenv from "dotenv"

dotenv.config();
import jwt from "jsonwebtoken";
import User from "./../models/usermodel.js";
const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "no token" });
    }
    const verified = jwt.verify(token, process.env.jwt_secret);
    if (!verified) {
      return res.status(401).json({ error: "invalid token" });
    }
    const user = await User.findById(verified.userId).select("-password");
    if (!user) {
      console.log(user);
      return res.status(404).json({ error: "user not found protectd routes" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error from protect route" });
  }
};

export default protectRoute;
