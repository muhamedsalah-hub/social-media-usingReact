import axios from "axios";

export const createComment = (postId, commentBody, token) => {
  return axios.post(
    `https://tarmeezacademy.com/api/v1/posts/${postId}/comments`,
    {
      body: commentBody,
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
