import apiAxios from ".";

export const getBuckets = async (withCards) => {
  const route = "/buckets".concat(withCards ? "?_embed=cards" : "");
  const response = await apiAxios.get(route);
  return response;
};

export const createBucket = async (data) => {
  const response = await apiAxios.post("/buckets", data);
  return response;
};
