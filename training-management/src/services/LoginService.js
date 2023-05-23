import AxiosInstance from '../axiosInstance';

const registerUrl = '/emp/v1/authenticate';

export const loginUsers = async (payload) => {
    const loginData = await AxiosInstance.post(registerUrl, JSON.stringify(payload), {
        headers: {
            "Content-Type": "application/json",
            withCredentials: true
        }
    });
    return loginData;
}