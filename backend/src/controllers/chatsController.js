import Chat from "../models/chatsController.js";

export const createChat = async (req, res, next) => {
  try {
    const { name, users } = req.body;

    const chat = await Chat.create({
      name,
      users
    });

    res.status(201).json({
      success: true,
      message: "Chat creado",
      data: chat
    });
  } catch (error) {
    next(error);
  }
};

export const getChats = async (req, res, next) => {
  try {
    const chats = await Chat.find().populate("users", "name email");

    res.json({
      success: true,
      message: "Chats obtenidos",
      data: chats
    });
  } catch (error) {
    next(error);
  }
};