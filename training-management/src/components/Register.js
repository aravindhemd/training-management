import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React, { useState } from "react";
import RedLogo from "../images/RedLogo.png";
import Home from "../images/home.jpg";
import addEmployee from "../services/employeeService";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Register = () => {
  const [registerData, setRegisterData] = useState({
    empId: "",
    empName: "",
    mailId: "",
    password: "",
    confirmPassword: "",
  });
  const [registerFlag, setRegisterFlag] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);
  const navigate = useNavigate();

  async function register(payload) {
    let data = await addEmployee(payload);
    return data;
  }

  const handleChange = (event) => {
    setRegisterData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async () => {
    if (
      registerData.password != "" &&
      registerData.password === registerData.confirmPassword
    ) {
      // Add validation for all data if empty or not
      //Submit Register Data
      console.log("register Data", registerData);
      registerData.disabled = true;
      const result = await register(registerData);
      if (result.statusCode == 201) {
        setRegisterFlag(true);
      } else {
        setErrorFlag(true);
      }
    } else {
      alert("Password Not match");
    }
  };

  const handleClose = (event, reason) => {
    console.log("REASON==>" + reason);
    if (reason === "clickaway") {
      return;
    }
    setRegisterFlag(false);
    setErrorFlag(false);
  };

  return (
    <>
      <Snackbar
        open={registerFlag}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          User Registered Successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={errorFlag} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Some Error Occurred
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
                <Typography>Training Management</Typography>
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
                  placeholder="Employee ID"
                ></TextField>
              </Grid>
              <Grid item sx={{ marginTop: "10px" }}>
                <TextField
                  name="empName"
                  onChange={(event) => {
                    handleChange(event);
                  }}
                  sx={{
                    ".MuiInputBase-input": {
                      padding: "10px",
                    },
                  }}
                  placeholder="Employee Name"
                ></TextField>
              </Grid>
              <Grid item sx={{ marginTop: "10px" }}>
                <TextField
                  name="mailId"
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
                <TextField
                  name="confirmPassword"
                  onChange={(event) => {
                    handleChange(event);
                  }}
                  sx={{
                    ".MuiInputBase-input": {
                      padding: "10px",
                    },
                  }}
                  placeholder="Confirm Password"
                ></TextField>
              </Grid>

              <Grid item sx={{ marginTop: "30px" }}>
                <Button variant="contained" onClick={handleSubmit}>
                  {" "}
                  Register
                </Button>
              </Grid>

              <Grid item sx={{ marginTop: "40px" }}>
                <Typography>
                  Already Have an Account? <Button onClick={()=> navigate("/Login")}>Login</Button>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Register;
