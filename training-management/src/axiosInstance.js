import axios from "axios";
import AuthContext from "./context/AuthProvider"
import React, { useContext } from "react";

const instance = axios.create({
  baseURL: 'http://localhost:8182',
  headers: {
    "Content-Type": "application/json",
    timeout: 1000,
  },
});

instance.interceptors.request.use((config) => {
  // const { auth } = useContext(AuthContext);
  // console.log(auth)
  const token = ""

  config.headers["Authorization"] = token;

  return config
})

instance.interceptors.response.use(
  function(response){
    return response;
  },
  function(error){
    return Promise.reject(error)
  }
)

export default instance;