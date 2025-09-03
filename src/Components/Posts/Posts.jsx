//Components
import { PostsCard } from "./../PostsCard/PostsCard";
import { DeleteDialogue } from "../DeleteDialogue/DeleteDialogue";
import { usePosts } from "./usePosts";
import { EditDialogue } from "../EditDialogue/EditDialogue";
import { CreatePostDialogue } from "../HomePage/CreatePostDialogue";

//React Hooks
import { useCurrentUser } from "../../Contexts/CurrentUserContext";

//MUI Components
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";

export const Posts = () => {
  //States
  const {
    isLoading,
    setIsLoading,
    openEditDialogue,
    handleOpenEditDialogue,
    handleCloseEditDialogue,
    handleCloseDeleteDialogue,
    handlePostId,
    handleOpenDeleteDialogue,
    postId,
    postData,
    posts,
    setPosts,
    openDeleteDialogue,
    handlePostData,
    handleCloseNewPostDialogue,
    newPostDialogue,
    setNewPostDialogue,
  } = usePosts();

  const { currentUser } = useCurrentUser();

  const createPostBtn = (
    <div
      onClick={() => {
        setNewPostDialogue(true);
      }}
    >
      <Button
        sx={{
          background: "blue",
          borderRadius: "50%",
          position: "fixed",
          bottom: {
            xs: "5rem",
            xl: "10rem",
          },
          right: {
            xs: "2rem",
            xl: "20rem",
          },
        }}
        variant="outlined"
      >
        <span style={{ fontSize: "2rem", color: "white" }}>+</span>
      </Button>
    </div>
  );

  const progress = (
    <div
      style={{
        background: "rgba(0,0,0,0.6)",
        width: "fit-content",
        padding: "0.6rem",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translateX(-50%)",
        borderRadius: "0.3rem",
      }}
    >
      <CircularProgress size={"3rem"} style={{ color: "white" }} />
    </div>
  );

  return (
    <>
      {isLoading ? progress : ""}
      {currentUser ? createPostBtn : ""}
      <CreatePostDialogue
        setIsLoading={setIsLoading}
        newPostDialogue={newPostDialogue}
        handleCloseNewPostDialogue={handleCloseNewPostDialogue}
        setPosts={setPosts}
      />
      {posts.map((p) => (
        <PostsCard
          key={p.id}
          postData={p}
          handleOpenDeleteDialogue={handleOpenDeleteDialogue}
          handleOpenEditDialogue={handleOpenEditDialogue}
          handlePostData={handlePostData}
          handleId={handlePostId}
        />
      ))}
      <EditDialogue
        setPosts={setPosts}
        handlePostData={handlePostData}
        postData={postData}
        handleCloseEditDialogue={handleCloseEditDialogue}
        openEditDialogue={openEditDialogue}
        postId={postId}
        setIsLoading={setIsLoading}
      />
      <DeleteDialogue
        setPosts={setPosts}
        openDeleteDialogue={openDeleteDialogue}
        handleCloseDeleteDialogue={handleCloseDeleteDialogue}
        id={postId}
        setIsLoading={setIsLoading}
      />
    </>
  );
};
