import { useEffect, useState } from "react";

import {
  getChats,
  createChat,
  getUsers,
} from "../services/api";

function Chats({ setSelectedChat }) {
  const [chats, setChats] = useState([]);

  const [users, setUsers] = useState([]);

  const [selectedUsers, setSelectedUsers] =
    useState([]);

  async function loadChats() {
    const data = await getChats();

    setChats(data);
  }

  async function loadUsers() {
    const data = await getUsers();

    setUsers(data);
  }

  async function handleCreateChat() {
    if (selectedUsers.length < 2) return;

    await createChat(selectedUsers);

    setSelectedUsers([]);

    loadChats();
  }

  function handleSelectUser(id) {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(
        selectedUsers.filter(
          (userId) => userId !== id
        )
      );
    } else {
      setSelectedUsers([
        ...selectedUsers,
        id,
      ]);
    }
  }

  useEffect(() => {
    loadChats();
    loadUsers();
  }, []);

  return (
    <div className="card">
      <h2>Chats</h2>

      <div>
        <h4>Seleccionar usuarios</h4>

        {users.map((user) => (
          <div key={user._id}>
            <input
              type="checkbox"
              onChange={() =>
                handleSelectUser(user._id)
              }
            />

            {user.name}
          </div>
        ))}

        <button onClick={handleCreateChat}>
          Crear Chat
        </button>
      </div>

      <ul>
        {chats.map((chat) => (
          <li
            key={chat._id}
            onClick={() =>
              setSelectedChat(chat)
            }
            className="chat-item"
          >
            Chat: {chat._id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Chats;