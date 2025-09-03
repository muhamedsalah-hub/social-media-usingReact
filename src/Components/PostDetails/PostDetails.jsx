//MUI Components
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

//Components
import { PostsCard } from "../PostsCard/PostsCard";
import { DeleteDialogue } from "../DeleteDialogue/DeleteDialogue";
import { SnackBar } from "../SnackBar/SnackBar";
import { EditDialogue } from "../EditDialogue/EditDialogue";

//React Hooks
import { useEffect, useState } from "react";
import { usePosts } from "../Posts/usePosts";
import { useSnackBar } from "../SnackBar/useSnackBar";

//React Router
import { useParams } from "react-router-dom";

//API Functions
import { getSpecificPost } from "../../API Requests/getSpecificPost";
import { createComment } from "./../../API Requests/createComment";

export const PostDetails = () => {
  //States
  const { postid } = useParams();
  const [selectedPost, setSelectedPost] = useState(null);
  const [comment, setComment] = useState("");

  //Use SnackBar
  const {
    openSnackBar,
    message,
    handleCloseSnackBar,
    handleOpenSnackBar,
    setMessage,
  } = useSnackBar();

  //Use Posts
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

  //Create comment function
  const handleAddComments = () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    //API Function
    createComment(postid, comment, token)
      .then(() => {
        handleOpenSnackBar();
        setMessage("Comment has been added successfully");
        setIsLoading(false);
        setComment("");
      })
      .catch((error) => {
        handleOpenSnackBar();
        setMessage(error.response.data.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getSpecificPost(postid)
      .then((response) => {
        setSelectedPost(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [comment]);

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

  if (!selectedPost) return;
  return (
    <div>
      <SnackBar
        openSnackBar={openSnackBar}
        message={message}
        handleCloseSnackBar={handleCloseSnackBar}
      />
      {isLoading ? progress : ""}
      <PostsCard
        postData={selectedPost}
        handleOpenDeleteDialogue={handleOpenDeleteDialogue}
        handleOpenEditDialogue={handleOpenEditDialogue}
        handlePostData={handlePostData}
        handleId={handlePostId}
      />
      <Card
        style={{
          borderTopLeftRadius: "0",
          borderTopRightRadius: "0",
          padding: "1rem",
        }}
      >
        {selectedPost?.comments.map((c) => (
          <div key={c.id}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: "1rem",
                background: "#E7E7E7",
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={c.author.profile_image}
                  style={{
                    width: "100%",
                    borderRadius: "50%",
                    marginLeft: "0.5rem",
                  }}
                />
              </div>
              <h4>{c.author.username}</h4>
            </div>
            <div style={{ background: "#E7E7E7" }}>
              <p style={{ marginTop: "0", marginLeft: "0.5rem" }}>{c.body}</p>
            </div>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            columnGap: "1rem",
          }}
        >
          <TextField
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            placeholder="Add your comment"
            size="small"
            fullWidth
          />
          <Button
            onClick={handleAddComments}
            variant="contained"
            size="medium"
            color="primary"
          >
            Add
          </Button>
        </div>
      </Card>
      <EditDialogue
        setPosts={setPosts}
        handlePostData={handlePostData}
        postData={postData}
        handleCloseEditDialogue={handleCloseEditDialogue}
        openEditDialogue={openEditDialogue}
        postId={postId}
        setSelectedPost={setSelectedPost}
        setIsLoading={setIsLoading}
      />
      <DeleteDialogue
        setPosts={setPosts}
        openDeleteDialogue={openDeleteDialogue}
        handleCloseDeleteDialogue={handleCloseDeleteDialogue}
        id={postId}
        setIsLoading={setIsLoading}
        setSelectedPost={setSelectedPost}
      />
    </div>
  );
};
