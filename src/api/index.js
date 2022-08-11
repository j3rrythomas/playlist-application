import axios from "axios";
import config from "./config";

const apiAxios = axios.create({
  baseURL: config.baseURL,
});

export default apiAxios;
