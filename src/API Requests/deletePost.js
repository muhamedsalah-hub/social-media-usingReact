import axios from "axios";

export const deletePost = (postId, token) => {
  return axios.delete(`https://tarmeezacademy.com/api/v1/posts/${postId}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
