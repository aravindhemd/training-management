import React from 'react';
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import Stack from '@mui/material/Stack';

const columns = [{ field: "trainingID", headerName: "Id", width: 70 },
{ field: "skill", headerName: "Skill", width: 70 },
{ field: "startDate", headerName: "Start Date", width: 100 },
{ field: "endDate", headerName: "End Date", width: 100 },
{ field: "requesterId", headerName: "Requestor Id", width: 120 },
{ field: "requestedDate", headerName: "Requested Date", width: 140 },
{ field: "theoryTrainer", headerName: "Theory Trainer", width: 140 },
{ field: "labTrainer", headerName: "Lab Trainer", width: 120 },
{ field: "empId", headerName: "Status", width: 100 },
{
  field: "actions", headerName: "Action", type: 'actions',
  width: 100,
  getActions: () => [
    <GridActionsCellItem icon={<EditIcon />} label="Edit" />,
    <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
  ],
}];

const Trainings = () => {
  const [trainingsData, setTrainingData] = useState("");

  useEffect(() => {
    axiosInstance.get('/training/').then((res) => {
      console.log(res.data.trainingList);
      console.log("-----------------------");
      setTrainingData(res.data.trainingList)
    })
  }, [])

  return (<div style={{ height: 400, width: "85%", margin: "auto", marginTop: 20 }}>
    {trainingsData &&
      <DataGrid
        components={{
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              No rows in DataGrid
            </Stack>
          )
        }}
        getRowId={(row) => row.trainingID}
        rows={trainingsData}
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

export default Trainings;