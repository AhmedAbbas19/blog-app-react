import TYPES from "../reducers/types";
import axios from "axios";

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

export function userLogin(user) {
  return axios.post(`http://localhost:4200/users/login`, JSON.stringify(user), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
