import apiAxios from ".";

export const getCards = async (withBucket) => {
  const route = "/cards".concat(withBucket ? "?_expand=bucket" : "");
  const response = await apiAxios.get(route);
  return response;
};

export const createCard = async (data) => {
  const response = await apiAxios.post("/cards", data);
  return response;
};

export const editCard = async (id,data) => {
  const response = await apiAxios.put(`/cards/${id}`, data);
  return response;
};

export const deleteCard = async (id) => {
  const response = await apiAxios.delete(`/cards/${id}`);
  return response;
};
