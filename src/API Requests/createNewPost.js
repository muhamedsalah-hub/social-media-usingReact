import axios from "axios";

export const createNewPost = (data, token) => {
  return axios.post(`https://tarmeezacademy.com/api/v1/posts`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
