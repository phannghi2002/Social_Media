import { Route, Routes } from "react-router-dom";
import "./App.css";
import Authentication from "./pages/Authentication/Authentication";
import HomePage from "./pages/HomePage/HomePage";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfileAction } from "./Redux/Auth/authAction";

import { darkTheme } from "./themes/DarkTheme";
import { ThemeProvider } from "@mui/material";
import PostDetail from "./components/Post/PostDetail";
import Message from "./pages/Message/Message";

function App() {
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileAction(jwt));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ThemeProvider theme={darkTheme}>
      <Routes>
        <Route
          path="/*"
          element={auth.user ? <HomePage /> : <Authentication />}
        />
        <Route
          path="/post/:postId"
          element={auth.user ? <PostDetail /> : <Authentication />}
        />
        <Route
          path="/message"
          element={auth.user ? <Message /> : <Authentication />}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
