import Conservation from "../models/conservationmodel.js";
import Message1 from './../models/messagemodel.js';
export const sendmessage = async (req, res) => {
  try {
    const { Message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conservation = await Conservation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conservation) {
      conservation = await Conservation.create({
        participants: [senderId, receiverId],
      });
    }

    const newmessage = new Message1({
      senderId,
      receiverId,
      Message,
    });

    if (newmessage) {
      conservation.Message.push(newmessage._id);
    }

    await Promise.all([conservation.save(), newmessage.save()]);
    res.status(201).json(newmessage);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "error from login part" });
  }
};

export const getmessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conservation = await Conservation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");
    if (!conservation) {
      [];
    }
    const messages = conservation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ error: "error from messagecontrol getmessage part" });
  }
};
