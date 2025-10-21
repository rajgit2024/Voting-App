import axios from "axios";

const API = axios.create({
  baseURL: process.env.BASE_URL,
});
  console.log("API BASE URL:",BASE_URL)

export default API;
