import axios from "axios";

const instance = axios.create({
  baseURL: "https://realestate-9288f-default-rtdb.firebaseio.com/",
});

export default instance;
