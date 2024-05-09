import express from "express";
import dotenv from "dotenv";
import authroutes from "./authroutes/authroutes.js";
import connectomongodb from "./db/connectingtomb.js";
import messageauthroutes from "./authroutes/messageauthroutes.js";
import cookieParser from "cookie-parser";
import userroutes from "./authroutes/userroutes.js"
dotenv.config();

const app = express();
app.use(cookieParser());

app.use(express.json());
const PORT = process.env.PORT || 3000;

//middleware

app.use("/api/auth", authroutes);
app.use("/api/messages", messageauthroutes);
app.use("/api/users", userroutes);


//for getting routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

//for listening
app.listen(PORT, () => {
  connectomongodb();
  console.log(`Server is running on port ${PORT}`);
});
