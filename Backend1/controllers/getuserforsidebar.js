import User from "../models/usermodel.js";

export const getuserforsidebar = async (req,res)=>{
    try {
        const loggedInuserId = req.user._id;
        const filtereduser = await User.find({_id:{$ne:loggedInuserId}}).select("-password")

        res.status(200).json(filtereduser);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
}