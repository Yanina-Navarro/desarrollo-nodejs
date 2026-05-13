import express from "express";
import cors from "cors";

import connectMongoDB from "./db.js";

import usersRoutes from "./routes/usersRoutes.js";
import chatsRoutes from "./routes/chatsRoutes.js";
import messagesRoutes from "./routes/messagesRoutes.js";

const server = express();

server.use(cors());

server.use(express.json());

server.use("/users", usersRoutes);

server.use("/chats", chatsRoutes);

server.use("/messages", messagesRoutes);

await connectMongoDB();

server.listen(5000, () => {

  console.log(
    "Servidor corriendo en http://localhost:5000"
  );

});

export default server;