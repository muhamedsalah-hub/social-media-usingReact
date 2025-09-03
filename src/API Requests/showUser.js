import axios from "axios";

export const showUser = (userId) => {
  return axios.get(`https://tarmeezacademy.com/api/v1/users/${userId}`);
};
