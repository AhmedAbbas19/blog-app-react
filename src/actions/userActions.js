import axios from "axios";
import setAuthorizationToken from "../components/users/utils/utils";

export async function getUserByUsername(username) {
  try {
    const response = await axios.get(
      `http://localhost:4200/users/${username}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
}

export function addUser(user) {
  return axios.post(
    `http://localhost:4200/users/register`,
    JSON.stringify(user),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
export async function userLogin(user) {
  try {
    const response = await axios.post(
      `http://localhost:4200/users/login`,
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
    `http://localhost:4200/users`,
    JSON.stringify({ activeId, followerId, follow }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
