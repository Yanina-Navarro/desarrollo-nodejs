import { useState } from "react";

import Users from "./components/Users";
import Chats from "./components/Chats";
import Messages from "./components/Messages";

import "../src/styles/app.css";

function App() {
  const [selectedChat, setSelectedChat] =
    useState(null);

  return (
    <div className="container">
      <h1>Chat App</h1>

      <div className="grid">
        <Users />

        <Chats
          setSelectedChat={setSelectedChat}
        />

        <Messages
          selectedChat={selectedChat}
        />
      </div>
    </div>
  );
}

export default App;