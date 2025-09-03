//MUI Components
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

//API Functions
import { showUser } from "../../API Requests/showUser";

//Components
import { PostsCard } from "../PostsCard/PostsCard";
import { EditDialogue } from "../EditDialogue/EditDialogue";
import { DeleteDialogue } from "../DeleteDialogue/DeleteDialogue";

//React Hooks
import { useEffect, useState } from "react";
import { usePosts } from "../Posts/usePosts";

//React Router
import { useParams } from "react-router-dom";
import { showUserPosts } from "../../API Requests/showUserPosts";

export const Profile = () => {
  const {
    openEditDialogue,
    handleOpenEditDialogue,
    handleCloseEditDialogue,
    handleCloseDeleteDialogue,
    handlePostId,
    handleOpenDeleteDialogue,
    postId,
    postData,
    setPosts,
    openDeleteDialogue,
    handlePostData,
    setIsLoading,
    isLoading,
  } = usePosts();

  //States
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    showUser(userId).then((response) => {
      setIsLoading(false);
      setUser(response.data.data);
    });
    showUserPosts(userId).then((response) => {
      setIsLoading(false);
      setUserPosts(response.data.data);
    });
  }, []);

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
      <div
        style={{
          background: "white",
          borderRadius: "0.5rem",
          marginTop: "2rem",
        }}
      >
        <Grid
          sx={{ padding: "1rem" }}
          container
          spacing={2}
          alignItems={"center"}
        >
          <Grid size={{ xs: 12, sm: 6 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: "1rem",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={user.profile_image}
                  style={{ width: "100%", borderRadius: "50%", height: "100%" }}
                />
              </div>
              <div>
                <h3>{user.name}</h3>
                <h3>{user.username}</h3>
              </div>
            </div>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <h3>
              <span
                style={{ fontSize: "2rem", color: "grey", fontWeight: "500" }}
              >
                {user.posts_count}
              </span>{" "}
              Posts
            </h3>
            <h3>
              <span
                style={{ fontSize: "2rem", color: "grey", fontWeight: "500" }}
              >
                {user.comments_count}
              </span>{" "}
              Comments
            </h3>
          </Grid>
        </Grid>
      </div>
      <h1>{user.name}'s Posts</h1>
      {userPosts.map((p) => (
        <PostsCard
          handleOpenDeleteDialogue={handleOpenDeleteDialogue}
          handleOpenEditDialogue={handleOpenEditDialogue}
          handlePostData={handlePostData}
          handleId={handlePostId}
          key={p.id}
          postData={p}
        />
      ))}
      <EditDialogue
        setUserPosts={setUserPosts}
        userId={userId}
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
        userId={userId}
        setUserPosts={setUserPosts}
        setIsLoading={setIsLoading}
        setUser={setUser}
      />
    </>
  );
};
