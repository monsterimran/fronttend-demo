import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5333/api/v1",
  baseURL: "https://priority-task-management.vercel.app/api/v1",
});

const useAxios = () => {
  return instance;
};

export default useAxios;