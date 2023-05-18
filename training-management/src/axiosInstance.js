import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:8182',
  headers: {
    "Content-Type": "application/json",
    timeout: 1000,
  },
});

export default instance;