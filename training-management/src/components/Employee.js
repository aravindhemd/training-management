import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import React, { useEffect, useState } from 'react';
import _ from 'underscore';
import axiosInstance from "../axiosInstance";
import CheckAuth from '../utils/checkAuth';
import { useNavigate } from 'react-router-dom';

const Employee = () => {

  const navigate = useNavigate();

  const handleClick = (event) => {
    console.log("-------------------")
    console.log(event);
    console.log("-------------------")
    navigate(`/AddEmployee?empId=${event.empId}`)
  }

  const columns = [
    { field: "empId", headerName: "Id", width: 70 },
    { field: "empName", headerName: "Employee Name", width: 150 },
    { field: "primary_skills", headerName: "Primary Skills", width: 180 },
    { field: "secondary_skills", headerName: "Secondary Skills", width: 180 },
    {
      field: "actions", headerName: "Action", type: 'actions',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem key="empId" name='empId' value={params.row} onClick={() => handleClick(params.row)} icon={<EditIcon />} label="Edit" />,
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
      ],
    }];

  console.log("Employee Component rendered");
  const [empData, setEmpData] = useState("");
  CheckAuth();

  useEffect(() => {

    axiosInstance.get('/emp/v1/emp/list')
      .then((res) => {
        res.data.data && res.data.data.forEach(element => {
          element["primary_skills"] = _.pluck(element.primarySkills, "skillName").join(",");
          element["secondary_skills"] = _.pluck(element.secondarySkills, "skillName").join(",");
        });
        setEmpData(res.data.data)
      })
  }, [])

  return (<div style={{ height: 400, width: "60%", margin: "auto", marginTop: 20 }}>
    {empData &&
      <DataGrid
        getRowId={(row) => row.empId}
        rows={empData}
        columns={columns}
        key={(row) => row.empId}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />}
  </div>)
}

export default Employee;