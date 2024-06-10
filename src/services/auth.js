import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const loginService = async (body) => {
  const res = await axios.post(BASE_URL + "/api/v1/auth/login", body);
  return res;
};
const registerService = async (body) => {
  const res = await axios.post(BASE_URL + "/api/v1/auth/register", body);
  return res;
};
export { registerService, loginService };
