import axios from "axios";
import setAuthorizationToken from "../components/users/utils/utils";
import { BACKEND_URL } from "../config";

export async function getUserByUsername(username) {
  try {
    const response = await axios.get(`${BACKEND_URL}/users/${username}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
}

export function addUser(user) {
  return axios.post(`${BACKEND_URL}/users/register`, JSON.stringify(user), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
export async function userLogin(user) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/users/login`,
      JSON.stringify(user),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const token = response.data.token;
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("username", response.data.user.username);
    setAuthorizationToken(token);
    return response;
  } catch (error) {
    return error;
  }
}

export async function followUser(activeId, followerId, follow) {
  return await axios.patch(
    `${BACKEND_URL}/users`,
    JSON.stringify({ activeId, followerId, follow }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
