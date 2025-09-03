//MUI Components
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

//React Router
import { Link } from "react-router-dom";

//CSS Files
import "../../Style sheets/NavBar.css";

//React Hooks
import { useEffect, useState } from "react";
import { useCurrentUser } from "../../Contexts/CurrentUserContext";
import { useSnackBar } from "../SnackBar/useSnackBar";

//Components
import { LoginDialogue } from "../LoginDialogue/LoginDialogue";
import { RegisterDialogue } from "../RegisterDialogue/RegisterDialogue";
import { SnackBar } from "../SnackBar/SnackBar";

export const NavBar = () => {
  //Dialogues State
  const [openLoginDialogue, setOpenLoginDialogue] = useState(false);
  const [openRegisterDialogue, setOpenRegisterDialogue] = useState(false);

  //Use SnackBar
  const {
    openSnackBar,
    message,
    handleCloseSnackBar,
    handleOpenSnackBar,
    setMessage,
  } = useSnackBar();

  //currentUser State
  const { currentUser, setCurrentUser } = useCurrentUser();

  useEffect(() => {
    (function getCurrentUser() {
      if (localStorage.getItem("user") !== null) {
        setCurrentUser(JSON.parse(localStorage.getItem("user")));
      }
    })();
  }, []);

  //Login Dialogues
  function showLogInDialogue() {
    setOpenLoginDialogue(true);
  }

  function hideLogInDialogue() {
    setOpenLoginDialogue(false);
  }

  //Register Dialogues
  function showRegisterDialogue() {
    setOpenRegisterDialogue(true);
  }

  function hideRegisterDialogue() {
    setOpenRegisterDialogue(false);
  }

  //Logout clicked function
  const logOutBtnClicked = () => {
    handleOpenSnackBar();
    setMessage("You Logged Out successfully");
    setCurrentUser(null);
    localStorage.clear();
  };

  return (
    <div style={{ background: "white", borderRadius: "0.5rem" }}>
      <SnackBar
        openSnackBar={openSnackBar}
        message={message}
        handleCloseSnackBar={handleCloseSnackBar}
      />
      <LoginDialogue
        showDialogue={openLoginDialogue}
        handleDialogue={hideLogInDialogue}
      />
      <RegisterDialogue
        showDialogue={openRegisterDialogue}
        handleDialogue={hideRegisterDialogue}
      />

      <Grid
        justifyContent={"space-between"}
        container
        style={{ padding: "0.7rem" }}
        alignItems={"center"}
        sx={{ rowGap: { xs: "1rem", sm: "0" } }}
      >
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack
            sx={{
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              alignItems: { xs: "start", sm: "center" },
              columnGap: { sm: "1rem" },
              rowGap: { xs: "1rem" },
            }}
            spacing={1}
          >
            <Link style={{ color: "black" }} to={"/"}>
              <h4 style={{ margin: "0" }}>Social Media</h4>
            </Link>
            <Link style={{ margin: "0", color: "black" }} to={"/"}>
              <span>Home</span>
            </Link>
            <Link
              style={{ margin: "0", color: "black" }}
              to={!currentUser ? "/" : `/profile/${currentUser?.id}`}
            >
              <span>Profile</span>
            </Link>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack
            columnGap={1}
            sx={{
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              rowGap: { xs: "0.5rem" },
            }}
            justifyContent={"end"}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: "0.5rem",
              }}
            >
              <h4 style={{ margin: 0 }}>{currentUser?.username}</h4>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={currentUser?.profile_image}
                  style={{
                    width: "100%",
                    borderRadius: "50%",
                    padding: "0.1rem",
                    height: "100%",
                  }}
                />
              </div>
            </div>
            <Button
              className="navBarBtn"
              color="success"
              sx={{ borderRadius: "0.5rem", width: { xs: "fit-content" } }}
              variant="outlined"
              size="small"
              onClick={showLogInDialogue}
              style={currentUser ? { display: "none" } : { display: "inline" }}
            >
              Log in
            </Button>
            <Button
              className="navBarBtn"
              color="success"
              sx={{
                borderRadius: "0.5rem",
                width: { xs: "fit-content" },
              }}
              variant="outlined"
              size="small"
              onClick={showRegisterDialogue}
              style={currentUser ? { display: "none" } : { display: "inline" }}
            >
              Register
            </Button>
            <Button
              onClick={logOutBtnClicked}
              className="navBarBtnError"
              color="error"
              sx={{
                borderRadius: "0.5rem",
                width: { xs: "fit-content" },
              }}
              variant="outlined"
              size="small"
              style={currentUser ? { display: "inline" } : { display: "none" }}
            >
              Log out
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};
