import { useState } from "react";

import {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} from "../services/api";

function Users() {
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [editingId, setEditingId] =
    useState(null);

  async function loadUsers() {
    const data = await getUsers();

    setUsers(data);
  }

  async function handleSubmit() {
    if (!name || !email) return;

    // EDITAR

    if (editingId) {
      await updateUser(editingId, {
        name,
        email,
      });

      setEditingId(null);
    }

    // CREAR

    else {
      await createUser(name, email);
    }

    setName("");
    setEmail("");

    loadUsers();
  }

  async function handleDelete(id) {
    await deleteUser(id);

    loadUsers();
  }

  function handleEdit(user) {
    setEditingId(user._id);

    setName(user.name);

    setEmail(user.email);
  }

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

      <button onClick={handleSubmit}>
        {editingId
          ? "Actualizar Usuario"
          : "Crear Usuario"}
      </button>

      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <div>
              <strong>{user.name}</strong>

              <p>{user.email}</p>
            </div>

            <div className="user-actions">
              <button
                onClick={() =>
                  handleEdit(user)
                }
              >
                Editar
              </button>

              <button
                onClick={() =>
                  handleDelete(user._id)
                }
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="actions">
        <button onClick={loadUsers}>
          Obtener Usuarios
        </button>
      </div>
    </div>
  );
}

export default Users;