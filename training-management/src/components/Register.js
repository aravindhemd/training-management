import { Box, Grid, TextField, Typography, Button } from "@mui/material";
import React from "react";
import Logo from "../images/HTC-Logo_Green.png";
import { useEffect, useState } from "react";
import addEmployee from "../services/employeeService";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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
    console.log("REASON==>"+reason)
    if (reason === 'clickaway') {
      return;
    }
    setRegisterFlag(false)
    setErrorFlag(false)
  }

  return (
    <>
    <Snackbar open={registerFlag} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          User Registered Successfully!
        </Alert>
    </Snackbar>
    <Snackbar open={errorFlag} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Some Error Occurred
        </Alert>
    </Snackbar>
      <Box>
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
        <Grid
          container
          rowGap={"3rem"}
          columnGap={"1rem"}
          justifyContent={"center"}
          paddingY={"8px"}
        >
          <Grid item lg={2} md={2} alignItems={"center"} display={"flex"}>
            <Typography>Employee ID</Typography>
          </Grid>
          <Grid item lg={2} md={2} display={"flex"}>
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
        </Grid>
        <Grid
          container
          rowGap={"3rem"}
          columnGap={"1rem"}
          justifyContent={"center"}
          paddingY={"8px"}
        >
          <Grid item lg={2} md={2} alignItems={"center"} display={"flex"}>
            <Typography>Employee Name</Typography>
          </Grid>
          <Grid item lg={2} md={2} display={"flex"}>
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
        </Grid>
        <Grid
          container
          rowGap={"3rem"}
          columnGap={"1rem"}
          justifyContent={"center"}
          paddingY={"8px"}
        >
          <Grid item lg={2} md={2} alignItems={"center"} display={"flex"}>
            <Typography>Email ID</Typography>
          </Grid>
          <Grid item lg={2} md={2} display={"flex"}>
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
        </Grid>
        <Grid
          container
          rowGap={"3rem"}
          columnGap={"1rem"}
          justifyContent={"center"}
          paddingY={"8px"}
        >
          <Grid item lg={2} md={2} alignItems={"center"} display={"flex"}>
            <Typography>Password</Typography>
          </Grid>
          <Grid item lg={2} md={2} display={"flex"}>
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
        </Grid>
        <Grid
          container
          rowGap={"3rem"}
          columnGap={"1rem"}
          justifyContent={"center"}
          paddingY={"8px"}
        >
          <Grid item lg={2} md={2} alignItems={"center"} display={"flex"}>
            <Typography>Confirm Password</Typography>
          </Grid>
          <Grid item lg={2} md={2} display={"flex"}>
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
              fullWidth
              placeholder=" Confirm Password"
            ></TextField>
          </Grid>
        </Grid>
        <Grid
          container
          rowGap={"3rem"}
          columnGap={"1rem"}
          justifyContent={"center"}
          paddingY={"8px"}
        >
          <Button variant="contained" onClick={handleSubmit}>
            {" "}
            Register
          </Button>
        </Grid>
      </Box>
    </>
  );
};

export default Register;
