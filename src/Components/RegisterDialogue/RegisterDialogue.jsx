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
import { useCurrentUser } from "../../Contexts/CurrentUserContext";
import { useSnackBar } from "../SnackBar/useSnackBar";

//Components
import { SnackBar } from "../SnackBar/SnackBar";

//Other Libraries
import axios from "axios";

export const RegisterDialogue = ({ showDialogue, handleDialogue }) => {
  //User state
  const [user, setUser] = useState({
    userName: "",
    name: "",
    password: "",
    email: "",
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

  //Current User State
  const { setCurrentUser } = useCurrentUser();

  const handleClose = () => {
    handleDialogue();
  };

  const handleRegisterBtn = () => {
    let newForm = new FormData();
    newForm.append("username", user.userName);
    newForm.append("password", user.password);
    newForm.append("image", user.image);
    newForm.append("email", user.email);
    newForm.append("name", user.name);

    axios
      .post("https://tarmeezacademy.com/api/v1/register", newForm, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then((response) => {
        handleOpenSnackBar();
        setMessage("Registered successfully");
        setCurrentUser(response.data.user);
        handleClose();
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
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
      <Dialog open={showDialogue} onClose={handleClose}>
        <DialogTitle sx={{ fontWeight: "bold" }}>Register :</DialogTitle>
        <Divider variant="fullWidth" />
        <DialogContent>
          <h3 style={{ fontWeight: "normal" }}>Username :</h3>
          <TextField
            onChange={(e) => {
              setUser({ ...user, userName: e.target.value });
            }}
            value={user.userName}
            fullWidth
            size="small"
            variant="outlined"
          />
          <h3 style={{ fontWeight: "normal" }}>Name :</h3>
          <TextField
            onChange={(e) => {
              setUser({ ...user, name: e.target.value });
            }}
            value={user.name}
            fullWidth
            size="small"
            variant="outlined"
          />
          <h3 style={{ fontWeight: "normal" }}>Password :</h3>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            type="password"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
          <h3 style={{ fontWeight: "normal" }}>Email :</h3>
          <TextField
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            value={user.email}
            fullWidth
            type="email"
            size="small"
            variant="outlined"
          />
          <h3 style={{ fontWeight: "normal" }}>Image :</h3>
          <TextField
            onChange={(e) => {
              setUser({ ...user, image: e.target.files[0] });
            }}
            fullWidth
            type="file"
            size="small"
            variant="outlined"
          />
        </DialogContent>
        <Divider variant="fullWidth" />
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleRegisterBtn} type="submit">
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
