import axios from "axios";

export const getPosts = (page = 1) => {
  return axios.get(
    `https://tarmeezacademy.com/api/v1/posts?limit=4&page=${page}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
};
