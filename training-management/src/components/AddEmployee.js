import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import { Theme, useTheme } from '@mui/material/styles';
import getSkillsAPI from '../utils/api';
import CheckAuth from "../utils/checkAuth";
import { getEmployeeUsingId } from "../services/employeeService";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddEmployee = () => {
  const theme = useTheme();
  const location = useLocation();
  const [personName, setPersonName] = useState([]);
  let [skillsData, setSkillsData] = useState([]);
  const [employeeData, setEmployeeData] = useState({
    empId: "",
    empName: "",
    mailId: "",
    role: "",
    disabled: "",
    isTrainer: false,
    primarySkills: [],
    secondarySkills: []
  });
  const [empFlag, setEmpFlag] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the query parameter
    const searchParams = new URLSearchParams(location.search);
    const empId = searchParams.get('empId');
    console.log(empId); // Or do something with the value
    getSkills();
    getEmployeeById(empId);
  }, []);

  const getEmployeeById = async (empId) => {
    console.log("##################################");
    let empData = await getEmployeeUsingId(empId);
    console.log(empData.data);
    const myObj = { ...employeeData, ...empData.data };
    // setEmployeeData((prevData) => ({
    //   ...prevData,
    //   ...empData.data
    // }));
    setEmployeeData(myObj);
    console.log(employeeData);
    console.log("##################################");
    console.log(myObj);
  }

  const getSkills = async () => {
    let data = await getSkillsAPI();
    console.log(data);
    console.log("===============");
    setSkillsData(data.skillList);
  }

  CheckAuth()

  // useEffect(() => {

  // }, [])

  const handleSelectChange = (event) => {
    console.log("handleSelectChange");
    console.log(event.target.name);
    console.log(event.target.value);
    console.log("handleSelectChange");
    setEmployeeData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      }
    })
    // const {
    //   target: { value },
    // } = event;
    // setPersonName(
    //   // On autofill we get a stringified value.
    //   typeof value === 'string' ? value.split(',') : value,
    // );
  };

  const handleChange = (event) => {
    setEmployeeData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const employeeSubmit = () => {
    console.log(employeeData);
    console.log("employeeData");
  }


  return (
    <>
      <Box className="formBox">
        <Grid container spacing={"3"} direction={"row"}>
          <Grid item>
            <Grid item sx={{ marginTop: "30px" }}>
              <Typography>Training Management</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ marginTop: "10px" }}>
          <TextField
            name="empId"
            value={employeeData.empId}
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
            value={employeeData.empName}
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
            value={employeeData.mailId}
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
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={employeeData.primarySkills}
            label={employeeData.primarySkills}
            onChange={handleSelectChange}
            name="primarySkills"
            input={<OutlinedInput label="primarySkills" />}
            MenuProps={MenuProps}
          >
            {skillsData.map((skill) => (
              <MenuItem
                key={skill.skillName}
                value={skill}
              >
                {skill.skillName}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item sx={{ marginTop: "10px" }}>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={employeeData.secondarySkills}
            name="secondarySkills"
            onChange={handleSelectChange}
            input={<OutlinedInput label="secondarySkills" />}
            MenuProps={MenuProps}
          >
            {skillsData.map((skill) => (
              <MenuItem
                key={skill.skillName}
                value={skill.skillId}
              >
                {skill.skillName}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item sx={{ marginTop: "10px" }}>
          <Button variant="contained" onClick={employeeSubmit}>
            {" "}
            SUBMIT
          </Button>
        </Grid>
      </Box>
    </>
  )
}

export default AddEmployee;