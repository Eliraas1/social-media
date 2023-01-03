import React, { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/homePage/Home";
import Login from "./pages/loginPage/Login";
import Profile from "./pages/profilePage/Profile";
import { useAppSelector } from "./store/store";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const darkMode = useAppSelector((state) => state.app.darkMode);
  const theme = useMemo(
    () => createTheme(themeSettings(darkMode) as any),
    [darkMode]
  );

  return (
    <div className="app ">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:userId" element={<Profile />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
