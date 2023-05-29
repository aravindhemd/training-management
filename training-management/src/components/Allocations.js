import React from 'react';
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import Stack from '@mui/material/Stack';
import CheckAuth from '../utils/checkAuth';

const columns = [
  { field: "allocationId", headerName: "Id", width: 70 },
  { field: "empName", headerName: "Employee Name", width: 180 },
  { field: "score", headerName: "Score", width: 120 },
  { field: "status", headerName: "Status", width: 120 },
  { field: "remarks", headerName: "Remarks", width: 120 },
  {
    field: "actions", headerName: "Actions", type: 'actions',
    width: 100,
    getActions: () => [
      <GridActionsCellItem icon={<EditIcon />} label="Edit" />,
      <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
    ],
  }];


const Allocations = () => {
  const [allocationData, setAllocationData] = useState("");
  CheckAuth()

  useEffect(() => {
    axiosInstance.get('/allocation/v1/allocation/list')
      .then((res) => {
        res.data.data.forEach(element => {
          element["empName"] = element.employee.empName;
        });
        setAllocationData(res.data.data)
      })
  }, [])

  return (<div style={{ height: 400, width: "65%", margin: "auto", marginTop: 20 }}>
    {allocationData &&
      <DataGrid
        components={{
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              No rows in DataGrid
            </Stack>
          )
        }}
        getRowId={(row) => row.allocationId}
        rows={allocationData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    }
  </div>)
}

export default Allocations;