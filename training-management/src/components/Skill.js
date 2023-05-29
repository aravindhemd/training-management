import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";
import getSkillsAPI from '../utils/api'
import axiosInstance from "../axiosInstance";
import CheckAuth from "../utils/checkAuth";

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

  async function getSkills() {
    let data = await getSkillsAPI();
    setSkillsData(data);
  }
  CheckAuth()

  useEffect(() => {
    getSkills();
  }, []);

  return (
    <div style={{ height: 400, width: "60%", margin: "auto", marginTop: 20 }}>
      {skillsData &&
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
        />
      }
    </div>
  );
}
export default Skills;
