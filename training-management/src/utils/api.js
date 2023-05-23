import axiosInstance  from "../axiosInstance";

const apiUrl = "/skills"

export default function getSkillsAPI(){
    const  data = axiosInstance
    .get("/skills/")
    .then((res) => res.data);
    return data;
}
