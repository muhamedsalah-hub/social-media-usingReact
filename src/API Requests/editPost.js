import axios from "axios";

export const editPost = (postId, data, token) => {
  return axios.post(`https://tarmeezacademy.com/api/v1/posts/${postId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
