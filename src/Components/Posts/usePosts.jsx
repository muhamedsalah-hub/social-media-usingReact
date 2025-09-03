//React Hooks
import { useEffect, useState } from "react";
import { getPosts } from "../../API Requests/GetPosts";

export const usePosts = () => {
  const [openDeleteDialogue, setOpenDeleteDialogue] = useState(false);
  const [openEditDialogue, setOpenEditDialogue] = useState(false);
  const [page, setPage] = useState(1);
  const [postData, setPostData] = useState({});
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState();
  const [newPostDialogue, setNewPostDialogue] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //Pagination
    const handleScroll = () => {
      let endOfPage =
        window.innerHeight + window.scrollY >= document.body.scrollHeight;
      if (endOfPage) {
        setPage((page) => page + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);

    //API Functions
    getPosts(page)
      .then((response) => {
        setIsLoading(false);
        setPosts([...posts, ...response.data.data]);
      })
      .catch((error) => {
        console.log(`Error fetching :`, error.message);
      });

    //Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  const handleCloseNewPostDialogue = () => {
    setNewPostDialogue(false);
  };

  const handleOpenDeleteDialogue = () => {
    setOpenDeleteDialogue(true);
  };

  const handleOpenEditDialogue = () => {
    setOpenEditDialogue(true);
  };

  const handlePostId = (id) => {
    setPostId(id);
  };

  const handlePostData = (post) => {
    setPostData({ title: post.title, body: post.body, image: post.image });
  };

  const handleCloseDeleteDialogue = () => {
    setOpenDeleteDialogue(false);
  };

  const handleCloseEditDialogue = () => {
    setOpenEditDialogue(false);
  };

  return {
    setNewPostDialogue,
    handleOpenEditDialogue,
    handleCloseEditDialogue,
    handleCloseDeleteDialogue,
    handlePostId,
    handleOpenDeleteDialogue,
    setPostId,
    setPage,
    setPosts,
    setOpenDeleteDialogue,
    handlePostData,
    handleCloseNewPostDialogue,
    setIsLoading,
    isLoading,
    newPostDialogue,
    postData,
    openEditDialogue,
    postId,
    page,
    posts,
    openDeleteDialogue,
  };
};
