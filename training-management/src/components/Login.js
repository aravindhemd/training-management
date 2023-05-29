import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import RedLogo from "../images/RedLogo.png";
import Home from "../images/home.jpg";
import { loginUsers } from "./../services/LoginService";

const registerUrl = "/emp/v1/authenticate";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginData, setLoginData] = useState({
    empId: "",
    password: "",
  });
  const [errorFlag, setErrorFlag] = useState(false);
  const [loginMsg, setLoginMsg] = useState(false);

  const handleValidation = () => {};

  const handleChange = (event) => {
    setLoginData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleClose = (event, reason) => {
    setErrorFlag(false);
  };

  const loginUser = async (payload) => {
    let data = await loginUsers(payload);
    return data;
  };

  const loginSubmit = async (e) => {
    try {
      e.preventDefault();
      handleValidation();

      console.log(loginData);
      const resp = await loginUser({
        userName: loginData.empId,
        password: loginData.password,
      });
      console.log(resp.data);

      const accessToken = resp?.data?.jwtToken;

      // const email = loginData.empId;
      // setAuth({"email":loginData.empId});
      if (resp.data  && resp.data !== "Bad Credentials"){
        setAuth({"email":loginData.empId});
        navigate("/Employee");
      }
      else {
        setErrorFlag(true)
        setLoginMsg(resp.data)
      }
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        alert(err?.response?.data);
      }
    }
  };

  return (
    <>
      <Snackbar open={errorFlag} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {loginMsg}
        </Alert>
      </Snackbar>
      <Box>
        <Grid container spacing={"3"} direction={"row"}>
          <Grid item>
            <img
              src={Home}
              alt="logo"
              style={{
                width: "100%",
                maxHeight: "100vh",
              }}
            />
          </Grid>

          <Grid item flexGrow={1}>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <img
                  src={RedLogo}
                  alt="logo"
                  style={{
                    maxHeight: "200px",
                    marginTop: "50px",
                  }}
                />
              </Grid>

              <Grid item sx={{ marginTop: "30px" }}>
                <Typography>Sign in with your Training Credentials</Typography>
              </Grid>
              <Grid item sx={{ marginTop: "10px" }}>
                <TextField
                  name="empId"
                  onChange={(event) => {
                    handleChange(event);
                  }}
                  sx={{
                    ".MuiInputBase-input": {
                      padding: "10px",
                    },
                  }}
                  placeholder="Email ID"
                ></TextField>
              </Grid>
              <Grid item sx={{ marginTop: "10px" }}>
                <TextField
                  name="password"
                  onChange={(event) => {
                    handleChange(event);
                  }}
                  sx={{
                    ".MuiInputBase-input": {
                      padding: "10px",
                    },
                  }}
                  placeholder="Password"
                ></TextField>
              </Grid>

              <Grid item sx={{ marginTop: "10px" }}>
                <Button variant="contained" onClick={loginSubmit}>
                  {" "}
                  Login
                </Button>
              </Grid>

              <Grid item sx={{ marginTop: "40px" }}>
                <Typography>Forgot Password?</Typography>
              </Grid>
              <Grid item sx={{ marginTop: "5px" }}>
                <Link href="#">Click here to Reset Password</Link>
              </Grid>

              <Grid item sx={{ marginTop: "40px" }}>
                <Typography>
                  No Account?{" "}
                  <Button onClick={() => navigate("/Register")}>
                    Register
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;
