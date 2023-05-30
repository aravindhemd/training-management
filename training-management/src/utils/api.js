import axiosInstance from "../axiosInstance";

const apiUrl = "/skills";

export default function getSkillsAPI() {
  const data = axiosInstance.get("/skills/").then((res) => res.data);
  return data;
}

export function addSkillAPI(payload) {
  const data = axiosInstance.post("/skills/", payload).then((res) => res.data);
  return data;
}

export function deleteSkillAPI(skillId){
    const data = axiosInstance.post("/skills/delete/"+skillId).then((res) => res.data);
    return data;
}

export function editSkillAPI(payload){
    const data = axiosInstance.post(apiUrl +"/edit",payload).then((res) => res.data)
    return data;
}