import dotenv from "dotenv";

dotenv.config();
import jwt from "jsonwebtoken";

const generatetoken = (userId, res) => {
  const token = jwt.sign(
    { userId },
    process.env.jwt_secret,
    {
      expiresIn: "15d",
    }
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });
  return token;
};

export default generatetoken;
