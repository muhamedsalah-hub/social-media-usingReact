import axios from "axios";

export const showUserPosts = (userId) => {
  
  return axios.get(`https://tarmeezacademy.com/api/v1/users/${userId}/posts`);
};
