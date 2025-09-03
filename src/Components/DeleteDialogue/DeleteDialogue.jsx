//MUI Components
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider } from "@mui/material";

//Api functions
import { deletePost } from "../../API Requests/deletePost";
import { getPosts } from "../../API Requests/GetPosts";
import { getSpecificPost } from "../../API Requests/getSpecificPost";
import { showUserPosts } from "../../API Requests/showUserPosts";
import { showUser } from "../../API Requests/showUser";

//React Hooks
import { useSnackBar } from "../SnackBar/useSnackBar";

//Components
import { SnackBar } from "../SnackBar/SnackBar";

export const DeleteDialogue = ({
  id,
  handleCloseDeleteDialogue,
  openDeleteDialogue,
  setPosts,
  userId,
  setUserPosts,
  setIsLoading,
  setSelectedPost,
  setUser,
}) => {
  const token = localStorage.getItem("token");

  //use SnackBar
  const {
    openSnackBar,
    message,
    handleCloseSnackBar,
    handleOpenSnackBar,
    setMessage,
  } = useSnackBar();

  const handleDeletePost = () => {
    setIsLoading(true);
    deletePost(id, token)
      .then(() => {
        handleOpenSnackBar();
        setMessage("Post has been deleted successfully");
        handleCloseDeleteDialogue();
        if (location.pathname.includes("/postDetails")) {
          getSpecificPost(id)
            .then((response) => {
              setIsLoading(false);
              setSelectedPost(response.data.data);
            })
            .catch((error) => {
              setIsLoading(false);
              console.log(error);
            });
        } else if (location.pathname.includes("/profile")) {
          showUser(userId).then((response) => {
            setUser(response.data.data);
          });
          showUserPosts(userId).then((response) => {
            setIsLoading(false);
            setUserPosts(response.data.data);
          });
        } else {
          getPosts()
            .then((response) => {
              setPosts(response.data.data);
              setIsLoading(false);
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
        open={openDeleteDialogue}
        onClose={() => {
          handleCloseDeleteDialogue();
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>Delete the post :</DialogTitle>
        <Divider variant="fullWidth" />
        <DialogContent>
          <h2 style={{ fontWeight: "normal" }}>
            Are you sure that you want to delete this post?
          </h2>
        </DialogContent>
        <Divider variant="fullWidth" />
        <DialogActions>
          <Button
            onClick={() => {
              handleCloseDeleteDialogue();
            }}
          >
            Close
          </Button>
          <Button onClick={handleDeletePost} type="submit">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
