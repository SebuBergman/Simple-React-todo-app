import React, { useState, useRef, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from'@mui/material/Button';
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../components/firebase/Firebase';
import { useNavigate } from 'react-router-dom';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
  integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
  crossorigin="anonymous"
/>

function NavBar() {
  const [uid, setUid] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setUid(user.uid);
        console.log("uid", uid);
      } else {
        // User is signed out
        console.log("user is logged out");
      }
    });
  }, [uid]);

  return (
    <Navbar bg="dark" id="NavbarContainer">
      <Container>
        <Navbar.Brand href="/" id="NavbarTitle">
          Todo-app
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <div flexDirection="row">
            <Navbar.Text id="NavbarUser">
              Signed in as: <p>{uid}</p>
            </Navbar.Text>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;