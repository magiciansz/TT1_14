import { BASE_URL } from "./constants";
import axios from "axios";
import Cookies from "js-cookie";

export const userLogin = async (username, password) => {
  const res = await axios
    .post(`${BASE_URL}/auth/login/`, {
      username: username,
      password: password,
    })
    .then((res) => {
      if (res.status === 200) {
        const data = res.data;
        const accessToken = data.access_token;
        const userId = data.user_id;
        Cookies.set("accessToken", accessToken);
        Cookies.set("userId", userId);
        return true;
      }
    });

  return res;
};
