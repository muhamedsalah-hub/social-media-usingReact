import "./App.css";

//React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

//MUI Components
import Container from "@mui/material/Container";

//Components
import { Home } from "./Components/HomePage/Home";
import { PostDetails } from "./Components/PostDetails/PostDetails";
import { NavBar } from "./Components/NavBar/NavBar";
import { Profile } from "./Components/Profile/Profile";

//React Hooks
import { CurrentUserContext } from "./Contexts/CurrentUserContext";
import { useState } from "react";

function App() {
  //User State
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="App">
      <Container maxWidth="md">
        <BrowserRouter>
          <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            <NavBar />
            <Routes>
              <Route path="/">
                <Route index element={<Home />} />
                <Route path="postDetails/:postid" element={<PostDetails />} />
                <Route path="profile/:userId">
                  <Route index element={<Profile />} />
                  <Route path="postDetails/:postid" element={<PostDetails />} />
                </Route>
              </Route>
            </Routes>
          </CurrentUserContext.Provider>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
