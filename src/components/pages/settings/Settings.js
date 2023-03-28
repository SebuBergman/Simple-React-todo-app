import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { onAuthStateChanged } from "firebase/auth";
import { UserAuth } from "../../../context/AuthContext";
import { auth } from "../../firebase/Firebase";
import NavBar from "../../../navbar/Navbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import "../../../Settings.css";

function Settings() {
  const [userDetails, setUserDetails] = useState("");
  const { user } = UserAuth();
  const navigate = useNavigate();

  function BackToTodoList() {
    navigate("/todolist");
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        const uid = user.uid;
        setUserDetails(uid);
      } else {
        // User is signed out
        console.log("user is logged out");
      }
    });
  }, [userDetails]);

  return (
    <div>
      <NavBar></NavBar>
      <div className="divBody">
        <div className="UserDetails">
          <h1 id="NavbarUser">{user && user.displayName}</h1>
          <h1 id="NavbarUser">{user && user.email}</h1>
        </div>
        <input className="darkmodeInput" type="checkbox" id="dark-mode" />
        <label className="darkmodeLabel" htmlFor="dark-mode"></label>
        <div className="background"></div>
        <div className="buttonContainer">
          <Button onClick={() => BackToTodoList()}>Back to TodoList</Button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
