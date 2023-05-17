const instance = require('../axiosInstance')

const apiUrl = "/skills"

async function getSkillsAPI(){
    await instance({
        "url": '/',
        "method":"GET",
    }).then((res)=>{
        console.log(res)
    })
}

export default getSkillsAPI;
