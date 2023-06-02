import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Typography } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import getSkillsAPI, {
  addSkillAPI,
  deleteSkillAPI,
  editSkillAPI,
} from "../utils/api";
import CheckAuth from "../utils/checkAuth";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const columns = [
  { field: "skillId", headerName: "ID", width: 70 },
  { field: "skillName", headerName: "Skill name", width: 130 },
  { field: "category", headerName: "Category", width: 130 },
  {
    field: "actions", headerName: "Action", type: 'actions',
    width: 100,
    getActions: () => [
      <GridActionsCellItem icon={<EditIcon />} label="Edit" />,
      <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
    ],
  }
];

function Skills() {
  let [skillsData, setSkillsData] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setSkillData({});
  };
  const handleClose = () => {
    setOpen(false);
    setEditFlag(false);
  };
  const [respFlag, setRespFlag] = useState(false);
  const [resMsg, setResMsg] = useState(false);
  const [skillData, setSkillData] = useState({});
  const [editFlag, setEditFlag] = useState(false);

  const columns = [
    { field: "skillId", headerName: "ID", width: 70 },
    { field: "skillName", headerName: "Skill name", width: 130 },
    { field: "category", headerName: "Category", width: 130 },
    {
      field: "edit",
      headerName: "Edit",
      width: 130,
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => editSkill(params.row)}
        />,
      ],
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 130,
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => deleteSkill(params.row.skillId)}
        />,
      ],
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function getSkills() {
    let data = await getSkillsAPI();
    setSkillsData(data);
  }
  CheckAuth()

  async function addSkill(payload) {
    let data = await addSkillAPI(payload);
    setRespFlag(true);
    setResMsg(data.message);
    setOpen(false);
  }

  async function editSkillData(payload) {
    let data = await editSkillAPI(payload);
    setRespFlag(true);
    setResMsg(data.message);
    setOpen(false);
  }

  async function deleteSkill(skillId) {
    let data = await deleteSkillAPI(skillId);
    setRespFlag(true);
    setResMsg("Skill deleted successfully");
  }

  function editSkill(payload) {
    handleOpen();
    setSkillData({
      name: payload.skillName,
      category: payload.category,
      skillId: payload.skillId,
    });
    setEditFlag(true);
  }

  CheckAuth();

  const getData = (data) => {
    console.log(data);
    if (!editFlag) addSkill(data);
    else editSkillData(data);
  };

  useEffect(() => {
    getSkills();
  }, []);

  const handleAlertClose = (event, reason) => {
    setRespFlag(false);
  };

  return (
    <Box>
      <Snackbar
        open={respFlag}
        autoHideDuration={3000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {resMsg}
        </Alert>
      </Snackbar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(getData)}>
            <div
              className="form-control"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <TextField
                id="outlined-disabled"
                label="skill Id"
                defaultValue={skillData.skillId ? skillData.skillId : ""}
                {...register("skillId")}
                sx={{ margin: "20px", display: "none" }}
                hidden="true"
              />
              <TextField
                id="outlined-disabled"
                label="Skill Name"
                defaultValue={skillData.name ? skillData.name : ""}
                {...register("skillName")}
                sx={{ margin: "20px" }}
              />
              <TextField
                id="outlined-disabled"
                label="Category"
                defaultValue={skillData.category ? skillData.category : ""}
                {...register("category")}
                sx={{ margin: "20px" }}
              />
              <Button variant="contained" sx={{ margin: "20px" }} type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Box>
      </Modal>

      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        flexDirection={{ lg: "row", md: "row", sm: "column", xs: "column" }}
      >
        <Button
          variant="contained"
          sx={{ margin: "20px" }}
          onClick={handleOpen}
        >
          Add Skill
        </Button>
      </Box>
      {skillsData && (
        <Box sx={{ maxWidth: "60%", marginInline: "auto" }}>
          <Typography>Skills List</Typography>
          <DataGrid
            getRowId={(row) => row.skillId}
            rows={skillsData.skillList}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ justifyContent: "center" }}
          />
        </Box>
      )}
    </Box>
    // <div style={{ height: 400, width: "60%", margin: "auto", marginTop: 20 }}>

    // </div>
  );
}
export default Skills;
