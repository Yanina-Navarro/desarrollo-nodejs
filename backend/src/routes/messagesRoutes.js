import express from "express";

import {
  sendMessage,
  getMessagesByChat
} from "../controllers/messagesController.js";

const router = express.Router();

router.post("/", sendMessage);
router.get("/:chatId", getMessagesByChat);

export default router;