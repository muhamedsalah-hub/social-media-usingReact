//MUI Components
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Divider } from "@mui/material";

//React Hooks
import { useState } from "react";
import { useSnackBar } from "../SnackBar/useSnackBar";

//API Functions
import { createNewPost } from "../../API Requests/createNewPost";
import { getPosts } from "../../API Requests/GetPosts";

//Component
import { SnackBar } from "../SnackBar/SnackBar";

export const CreatePostDialogue = ({
  newPostDialogue,
  handleCloseNewPostDialogue,
  setPosts,
  setIsLoading,
}) => {
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
    image: null,
  });

  //Use SnackBar
  const {
    openSnackBar,
    message,
    handleCloseSnackBar,
    handleOpenSnackBar,
    setMessage,
  } = useSnackBar();

  const handleNewPostBtn = () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const myForm = new FormData();
    myForm.append("body", newPost.body);
    myForm.append("title", newPost.title);
    myForm.append("image", newPost.image);

    createNewPost(myForm, token)
      .then(() => {
        handleOpenSnackBar();
        setMessage("Post has been added successfully");
        handleCloseNewPostDialogue();
        getPosts().then((response) => {
          setIsLoading(false);
          setPosts(response.data.data);
        });
      })
      .catch((error) => {
        handleOpenSnackBar();
        setMessage(error.response.data.message);
      });
  };

  return (
    <div>
      <SnackBar
        openSnackBar={openSnackBar}
        message={message}
        handleCloseSnackBar={handleCloseSnackBar}
      />
      <Dialog open={newPostDialogue} onClose={handleCloseNewPostDialogue}>
        <DialogTitle sx={{ fontWeight: "bold" }}>
          Create A New post :
        </DialogTitle>
        <Divider variant="fullWidth" />
        <DialogContent>
          <h3 style={{ fontWeight: "normal" }}>Title :</h3>
          <TextField
            value={newPost.title}
            fullWidth
            size="small"
            variant="outlined"
            onChange={(e) => {
              setNewPost({ ...newPost, title: e.target.value });
            }}
          />
          <h3 style={{ fontWeight: "normal" }}>Body :</h3>
          <TextField
            value={newPost.body}
            onChange={(e) => {
              setNewPost({ ...newPost, body: e.target.value });
            }}
            fullWidth
            size="small"
            variant="outlined"
          />
          <h3 style={{ fontWeight: "normal" }}>Image :</h3>
          <TextField
            onChange={(e) => {
              setNewPost({ ...newPost, image: e.target.files[0] });
            }}
            fullWidth
            size="small"
            variant="outlined"
            type="file"
          />
        </DialogContent>
        <Divider variant="fullWidth" />
        <DialogActions>
          <Button onClick={handleCloseNewPostDialogue}>Close</Button>
          <Button onClick={handleNewPostBtn} type="submit">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
