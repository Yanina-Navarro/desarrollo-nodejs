import { useEffect, useState } from "react";

import {
  getMessagesByChat,
  sendMessage,
  getUsers,
} from "../services/api";

function Messages({ selectedChat }) {
  const [messages, setMessages] = useState([]);

  const [users, setUsers] = useState([]);

  const [message, setMessage] = useState("");

  const [userId, setUserId] = useState("");

  async function loadMessages() {
    if (!selectedChat) return;

    const data = await getMessagesByChat(
      selectedChat._id
    );

    setMessages(data);
  }

  async function loadUsers() {
    const data = await getUsers();

    setUsers(data);
  }

  async function handleSendMessage() {
    if (!message || !userId) return;

    await sendMessage(
      selectedChat._id,
      userId,
      message
    );

    setMessage("");

    loadMessages();
  }
useEffect(() => {
  loadMessages();
}, [selectedChat]);

useEffect(() => {

  loadUsers();

  const interval = setInterval(() => {

    loadUsers();

  }, 2000);

  return () => clearInterval(interval);

}, []);

useEffect(() => {

  const userExists = users.some(
    (user) => user._id === userId
  );

  if (!userExists) {
    setUserId("");
  }

}, [users]);

  return (
    <div className="card">
      <h2>Mensajes</h2>

      {!selectedChat && (
        <p>Seleccioná un chat</p>
      )}

      {selectedChat && (
        <>
          <select
            value={userId}
            onChange={(e) =>
              setUserId(e.target.value)
            }
          >
            <option value="">
              Seleccionar usuario
            </option>

            {users.map((user) => (
              <option
                key={user._id}
                value={user._id}
              >
                {user.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Mensaje"
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
          />

          <button onClick={handleSendMessage}>
            Enviar
          </button>

          <ul>
            {messages.map((msg) => (
              <li key={msg._id}>
                <strong>
                  {msg.userId?.name}
                </strong>

                <p>{msg.message}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Messages;