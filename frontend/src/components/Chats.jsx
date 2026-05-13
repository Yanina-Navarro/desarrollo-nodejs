import { useState } from "react";

import {
  getChats,
  createChat,
} from "../services/api";

function Chats({
  selectedChat,
  setSelectedChat,
}) {

  const [chats, setChats] = useState([]);

  const [chatName, setChatName] =
    useState("");

  async function loadChats() {

    const data = await getChats();

    setChats(data);

  }

  async function handleCreateChat() {

    if (!chatName) return;

    await createChat(chatName, []);

    setChatName("");

    loadChats();

  }

  return (
    <div className="card">

      <h2>Chats</h2>

      <button onClick={loadChats}>
        Obtener Chats
      </button>

      <input
        type="text"
        placeholder="Nombre del chat"
        value={chatName}
        onChange={(e) =>
          setChatName(e.target.value)
        }
      />

      <button onClick={handleCreateChat}>
        Crear Chat
      </button>

      <ul>
        {chats.map((chat) => (
          <li
            key={chat._id}
            className={`
              chat-item
              ${
                selectedChat?._id ===
                chat._id
                  ? "active-chat"
                  : ""
              }
            `}
            onClick={() =>
              setSelectedChat(chat)
            }
          >
            <strong>
              {chat.name}
            </strong>
          </li>
        ))}
      </ul>

    </div>
  );

}

export default Chats;