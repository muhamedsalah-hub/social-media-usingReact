//MUI Components
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Divider } from "@mui/material";

//Components
import { SnackBar } from "../SnackBar/SnackBar";

//React Hooks
import { useSnackBar } from "../SnackBar/useSnackBar";

//Api Functions
import { editPost } from "../../API Requests/editPost";
import { getPosts } from "../../API Requests/GetPosts";
import { getSpecificPost } from "../../API Requests/getSpecificPost";
import { showUserPosts } from "../../API Requests/showUserPosts";

//React Router
import { useLocation } from "react-router-dom";

export const EditDialogue = ({
  userId,
  openEditDialogue,
  handleCloseEditDialogue,
  postData,
  handlePostData,
  postId,
  setPosts,
  setSelectedPost,
  setUserPosts,
  setIsLoading,
}) => {
  const location = useLocation();

  //use SnackBar
  const {
    openSnackBar,
    message,
    handleCloseSnackBar,
    handleOpenSnackBar,
    setMessage,
  } = useSnackBar();

  const handleEditClick = () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const myForm = new FormData();
    myForm.append("_method", "put");
    myForm.append("body", postData.body);
    myForm.append("title", postData.title);
    myForm.append("image", postData.image);

    editPost(postId, myForm, token)
      .then(() => {
        handleOpenSnackBar();
        setMessage("Post has been updated successfully");
        handleCloseEditDialogue();
        if (location.pathname.includes("/postDetails")) {
          getSpecificPost(postId)
            .then((response) => {
              setIsLoading(false);
              setSelectedPost(response.data.data);
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (location.pathname.includes("/profile")) {
          showUserPosts(userId).then((response) => {
            setIsLoading(false);
            setUserPosts(response.data.data);
          });
        } else {
          getPosts()
            .then((response) => {
              setIsLoading(false);
              setPosts(response.data.data);
            })
            .catch((error) => {
              console.log(`Error fetching :`, error.message);
            });
        }
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
      <Dialog
        open={openEditDialogue}
        onClose={() => {
          handleCloseEditDialogue();
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>Edit post :</DialogTitle>
        <Divider variant="fullWidth" />
        <DialogContent>
          <h3 style={{ fontWeight: "normal" }}>Title :</h3>
          <TextField
            value={postData.title}
            fullWidth
            size="small"
            variant="outlined"
            onChange={(e) => {
              handlePostData({ ...postData, title: e.target.value });
            }}
          />
          <h3 style={{ fontWeight: "normal" }}>Body :</h3>
          <TextField
            value={postData?.body}
            onChange={(e) => {
              handlePostData({ ...postData, body: e.target.value });
            }}
            fullWidth
            size="small"
            variant="outlined"
          />
          <h3 style={{ fontWeight: "normal" }}>Image :</h3>
          <TextField
            onChange={(e) => {
              handlePostData({ ...postData, image: e.target.files[0] });
            }}
            fullWidth
            size="small"
            variant="outlined"
            type="file"
          />
          <img src={postData.image} />
        </DialogContent>
        <Divider variant="fullWidth" />
        <DialogActions>
          <Button onClick={handleCloseEditDialogue}>Close</Button>
          <Button onClick={handleEditClick} type="submit">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
