import axios from "axios";

export const getSpecificPost = (postId) => {
  return axios.get(
    `https://tarmeezacademy.com/api/v1/posts/${postId}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
};
