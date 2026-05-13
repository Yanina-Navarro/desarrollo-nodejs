const API_URL = "http://localhost:5000";

let selectedChat = null;

async function createUser() {

  const name = document.getElementById("name").value;

  const email = document.getElementById("email").value;

  if (!name || !email) {
    return alert("Completar todos los campos");
  }

  if (!email.includes("@")) {
    return alert("Email inválido");
  }

  try {

    await fetch(`${API_URL}/users`, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name,
        email
      })

    });

    document.getElementById("name").value = "";

    document.getElementById("email").value = "";

    getUsers();

  } catch (error) {

    console.log(error);

  }
}


async function deleteUser(id) {

  const confirmDelete = confirm("¿Eliminar usuario?");

  if (!confirmDelete) return;

  try {

    await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE"
    });

    getUsers();

  } catch (error) {

    console.log(error);

  }
}
async function editUser(id, currentName, currentEmail) {

  const newName = prompt("Nuevo nombre:", currentName);

  if (!newName) return;

  const newEmail = prompt("Nuevo email:", currentEmail);

  if (!newEmail) return;

  try {

    await fetch(`${API_URL}/users/${id}`, {

      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name: newName,
        email: newEmail
      })

    });

    getUsers();

  } catch (error) {

    console.log(error);

  }
}

async function getUsers() {

  try {

    const response = await fetch(`${API_URL}/users`);

    const result = await response.json();

    const usersList = document.getElementById("usersList");

    const userSelect = document.getElementById("userSelect");

    usersList.innerHTML = "";

    userSelect.innerHTML = "";

    result.data.forEach(user => {

      const li = document.createElement("li");

      li.innerHTML = `
        <div class="user-item">

          <span>
            ${user.name} - ${user.email}
          </span>

<div class="actions">

  <button onclick="editUser('${user._id}', '${user.name}', '${user.email}')">
    Editar
  </button>

  <button onclick="deleteUser('${user._id}')">
    Eliminar
  </button>

</div>

        </div>
      `;

      usersList.appendChild(li);

      const option = document.createElement("option");

      option.value = user._id;

      option.textContent = user.name;

      userSelect.appendChild(option);

    });

  } catch (error) {

    console.log(error);

  }
}

async function createChat() {

  const name = document.getElementById("chatName").value;

  if (!name) {
    return alert("Ingresar nombre del chat");
  }

  try {

    const responseUsers = await fetch(`${API_URL}/users`);

    const usersResult = await responseUsers.json();

    const users = usersResult.data.map(user => user._id);

    await fetch(`${API_URL}/chats`, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name,
        users
      })

    });

    document.getElementById("chatName").value = "";

    getChats();

  } catch (error) {

    console.log(error);

  }
}

async function getChats() {

  try {

    const response = await fetch(`${API_URL}/chats`);

    const result = await response.json();

    const chatsList = document.getElementById("chatsList");

    chatsList.innerHTML = "";

    result.data.forEach(chat => {

      const li = document.createElement("li");

      li.textContent = chat.name;

      li.onclick = () => {

        selectedChat = chat._id;

        getMessages(chat._id);

      };

      chatsList.appendChild(li);

    });

  } catch (error) {

    console.log(error);

  }
}

async function sendMessage() {

  if (!selectedChat) {
    return alert("Seleccionar chat");
  }

  const userId = document.getElementById("userSelect").value;

  const message = document.getElementById("messageInput").value;

  if (!message) {
    return alert("Escribir mensaje");
  }

  try {

    await fetch(`${API_URL}/messages`, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        chatId: selectedChat,
        userId,
        message
      })

    });

    document.getElementById("messageInput").value = "";

    getMessages(selectedChat);

  } catch (error) {

    console.log(error);

  }
}

async function getMessages(chatId) {

  try {

    const response = await fetch(`${API_URL}/messages/${chatId}`);

    const result = await response.json();

    const messagesDiv = document.getElementById("messages");

    messagesDiv.innerHTML = "";

    result.data.forEach(msg => {

      const div = document.createElement("div");

      div.classList.add("message");

      div.innerHTML = `
        <strong>${msg.userId.name}:</strong>
        ${msg.message}

        <br>

        <small>
          ${new Date(msg.createdAt).toLocaleString()}
        </small>
      `;

      messagesDiv.appendChild(div);

    });

  } catch (error) {

    console.log(error);

  }
}
