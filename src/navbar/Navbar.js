import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from'@mui/material/Button';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../components/firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
  integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
  crossorigin="anonymous"
/>

function NavBar() {
  const navigate = useNavigate();

  const { user, logout } = UserAuth();
  const [uid, setUid] = useState("");
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log('You are logged out')
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setUid(user.uid);
      } else {
        // User is signed out
        console.log("user is logged out");
      }
    });
  }, [uid]);

  function SettingsNavigation() {
    navigate("/settings");
  }

  return (
    <Navbar bg="dark" id="NavbarContainer">
      <Container className="NavbarContainer">
        <Navbar.Brand href="/todolist" id="NavbarTitle">
          Todo-app
        </Navbar.Brand>
        <Navbar.Toggle />
          <div id="UserText">
              <p id="NavbarUserWhite">Signed in as: {user && user.email}</p>
              <IconButton aria-label="delete" className="mx-2 text-danger">
                <SettingsIcon onClick={() => SettingsNavigation()}/>
              </IconButton>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;