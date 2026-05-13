import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

// USERS

export const getUsers = async () => {
  const response = await api.get("/users");

  return response.data.data;
};

export const createUser = async (
  name,
  email
) => {
  const response = await api.post("/users", {
    name,
    email,
  });

  return response.data.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(
    `/users/${id}`
  );

  return response.data.data;
};

export const updateUser = async (
  id,
  userData
) => {
  const response = await api.put(
    `/users/${id}`,
    userData
  );

  return response.data.data;
};

// CHATS

export const getChats = async () => {
  const response = await api.get("/chats");

  return response.data.data;
};

export const createChat = async (
  name,
  users
) => {
  const response = await api.post("/chats", {
    name,
    users,
  });

  return response.data.data;
};

// MESSAGES

export const getMessagesByChat = async (
  chatId
) => {
  const response = await api.get(
    `/messages/${chatId}`
  );

  return response.data.data;
};

export const sendMessage = async (
  chatId,
  userId,
  message
) => {
  const response = await api.post(
    "/messages",
    {
      chatId,
      userId,
      message,
    }
  );

  return response.data.data;
};

export default api;