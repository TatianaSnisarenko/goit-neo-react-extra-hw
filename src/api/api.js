import axios from "axios";

const api = axios.create({
  baseURL: "https://connections-api.goit.global",
});

export const setAuthHeader = (token) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const removeAuthHeader = () => {
  delete api.defaults.headers.common["Authorization"];
};

export const getContacts = async () => {
  const { data } = await api.get("/contacts");
  return data;
};

export const addNewContact = async (contact) => {
  const { data } = await api.post("/contacts", contact);
  return data;
};

export const deleteContactById = async (id) => {
  await api.delete(`/contacts/${id}`);
};

export const updateContactById = async (id, contact) => {
  const { data } = await api.patch(`/contacts/${id}`, contact);
  return data;
};

//  {
//   "name": "Adrian Cross",
//   "email": "across@mail.com",
//   "password": "examplepwd12345"
// }
export const createNewUser = async (user) => {
  const { data } = await api.post("/users/signup", user);
  return data;
};

// {
//   "email": "string",
//   "password": "string"
// }
export const loginUser = async (user) => {
  const { data } = await api.post("/users/login", user);
  return data;
};

export const refreshUser = async () => {
  const { data } = await api.get("/users/current");
  return data;
};

export const logoutUser = async () => {
  await api.post("/users/logout");
};
