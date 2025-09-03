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
import { useState } from "react";
import { useCurrentUser } from "../../Contexts/CurrentUserContext";
import { useSnackBar } from "../SnackBar/useSnackBar";

//Other Libraries
import axios from "axios";

export const LoginDialogue = ({ showDialogue, handleDialogue }) => {
  //User State
  const [user, setUser] = useState({ userName: "", password: "" });

  //Current User State
  const { setCurrentUser } = useCurrentUser();

  //Use SnackBar
  const {
    openSnackBar,
    message,
    handleCloseSnackBar,
    handleOpenSnackBar,
    setMessage,
  } = useSnackBar();

  const handleClose = () => {
    handleDialogue();
  };

  const handleLogInBtn = () => {
    const params = {
      username: user.userName,
      password: user.password,
    };

    axios
      .post("https://tarmeezacademy.com/api/v1/login", params, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        handleOpenSnackBar();
        setMessage("You Logged in successfully");
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
        <DialogTitle sx={{ fontWeight: "bold" }}>Log In :</DialogTitle>
        <Divider variant="fullWidth" />
        <DialogContent>
          <h3 style={{ fontWeight: "normal" }}>Username :</h3>
          <TextField
            onChange={(e) => {
              setUser({ ...user, userName: e.target.value });
            }}
            value={user.userName}
            size="small"
            variant="outlined"
          />
          <h3 style={{ fontWeight: "normal" }}>Password :</h3>
          <TextField
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            value={user.password}
            size="small"
            variant="outlined"
            type="password"
          />
        </DialogContent>
        <Divider variant="fullWidth" />
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleLogInBtn} type="submit">
            Log in
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
