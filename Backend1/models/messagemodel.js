import  mongoose  from 'mongoose';

const MessageSchema = new mongoose.Schema({
   
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    Message: {
        type: String,
        required: true
    },
   
},{timestamps: true})


const Message1 = mongoose.model('message', MessageSchema);

export default Message1;