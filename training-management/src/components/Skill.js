import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import getSkillsAPI from '../utils/api'
import axiosInstance  from "../axiosInstance";

const columns = [
  { field: "skillId", headerName: "ID", width: 70 },
  { field: "skillName", headerName: "Skill name", width: 130 },
  { field: "category", headerName: "Category", width: 130 },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 10, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 11, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 12, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

function Skills() {
  let [skillsData, setSkillsData] = useState("");

  useEffect(() => {
    axiosInstance
      .get("/skills/")
      .then((res) => {
        setSkillsData(res.data)
      })
  }, [])

  if(skillsData && skillsData.skillList){
    console.log(skillsData)
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
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
      /> }
    </div>
  ); 
}
export default Skills;
