import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const loginService = async (body) => {
  const res = await axios.post(BASE_URL + "/api/v1/auth/login", body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
const registerService = async (body) => {
  const res = await axios.post(BASE_URL + "/api/v1/auth/register", body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
export { registerService, loginService };
