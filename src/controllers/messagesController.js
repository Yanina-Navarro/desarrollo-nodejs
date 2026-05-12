import Message from "../models/messagesController.js";

export const sendMessage = async (req, res, next) => {
  try {
    const { chatId, userId, message } = req.body;

    const newMessage = await Message.create({
      chatId,
      userId,
      message
    });

    res.status(201).json({
      success: true,
      message: "Mensaje enviado",
      data: newMessage
    });
  } catch (error) {
    next(error);
  }
};

export const getMessagesByChat = async (req, res, next) => {
  try {
    const messages = await Message.find({
      chatId: req.params.chatId
    })
      .populate("userId", "name")
      .sort({ createdAt: 1 });

    res.json({
      success: true,
      message: "Mensajes obtenidos",
      data: messages
    });
  } catch (error) {
    next(error);
  }
};