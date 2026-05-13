import express from "express";

import {
  createChat,
  getChats
} from "../controllers/chatsController.js";

const router = express.Router();

router.post("/", createChat);
router.get("/", getChats);

export default router;