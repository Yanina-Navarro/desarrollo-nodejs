import { useEffect, useState } from "react";

import {
  getUsers,
  createUser,
  deleteUser,
} from "../services/api";

function Users() {
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  async function loadUsers() {
    const data = await getUsers();

    setUsers(data);
  }

  async function handleCreateUser() {
    if (!name || !email) return;

    await createUser(name, email);

    setName("");
    setEmail("");

    loadUsers();
  }

  async function handleDelete(id) {
    await deleteUser(id);

    loadUsers();
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="card">
      <h2>Usuarios</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <button onClick={handleCreateUser}>
        Crear Usuario
      </button>

      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <strong>{user.name}</strong>

            <p>{user.email}</p>

            <button
              onClick={() =>
                handleDelete(user._id)
              }
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;