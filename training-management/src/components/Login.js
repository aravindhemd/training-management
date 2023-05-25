import React, { useState, useRef, useEffect, useContext } from "react";
import axios from './../api/axios';
import AuthContext from "../context/AuthProvider";
import Logo from "../images/HTC-Logo_Green.png";
import { Box, Grid, TextField, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUsers } from "./../services/LoginService";

const registerUrl = '/emp/v1/authenticate';

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleValidation = () => {
    console.log("aaaaaaaaaaaa");
  }

  const loginUser = async (payload) => {
    let data = await loginUsers(payload);
    return data;
  }

  const loginSubmit = async (e) => {
    try {
      e.preventDefault();
      handleValidation();

      console.log(email, password);
      const resp = await loginUser({ userName: email, password: password });
      // const resp = await axios.post(registerUrl, JSON.stringify({ userName: email, password: password }), {
      //   headers: {
      //     "Content-Type": "application/json",
      //     withCredentials: true
      //   }
      // });
      const accessToken = resp?.data?.jwtToken;
      setAuth({ accessToken, email });
      console.log(resp + "resp");
      if (resp.status === 200)
        navigate('/Employee');
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        alert(err?.response?.data);
      }
    }

  };

  return (
    <div className="Login">
      <Grid
        container
        rowGap={"3rem"}
        columnGap={"1rem"}
        justifyContent={"center"}
        paddingY={"1rem"}
      >
        <Box>
          <img src={Logo} alt="logo" />
        </Box>
      </Grid>
      <Box
        component="form"
        sx={{ border: 1, width: 300, height: 250, margin: 'auto', marginTop: 4 }}
      >
        <TextField id="email" onChange={(event) => setEmail(event.target.value)} label="Email" variant="standard" />
        <br></br>
        <TextField id="password" onChange={(event) => setPassword(event.target.value)} type="password" label="Password" variant="standard" />
        <br></br>
        <Button color="primary" className="login-submit" onClick={loginSubmit} variant="contained">Sign In</Button>
      </Box >
    </div>
  );
}

export default Login;