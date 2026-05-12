import express from "express";
import cors from "cors";
import path from "path";

import { fileURLToPath } from "url";

import connectMongoDB from "./db.js";

import usersRoutes from "./routes/usersRoutes.js";
import chatsRoutes from "./routes/chatsRoutes.js";
import messagesRoutes from "./routes/messagesRoutes.js";


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const server = express();


server.use(cors());

server.use(express.json());

server.use(express.static(path.join(__dirname, "../front")));

server.use("/users", usersRoutes);

server.use("/chats", chatsRoutes);

server.use("/messages", messagesRoutes);

server.listen(5000, () => {

  connectMongoDB();

  console.log(`Servidor corriendo en http://localhost:5000`);

});

export default server;