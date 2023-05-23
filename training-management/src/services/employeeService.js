import  AxiosInstance  from '../axiosInstance'

const apiUrl = "/emp/v1"


export default function addEmployee(payload){
    const data = AxiosInstance
        .post(apiUrl+"/addEmployee", payload)
        .then((res) => res.data);
    return data;
}