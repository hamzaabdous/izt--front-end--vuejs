import axios from "axios";
const CustomizedAxios = axios;
CustomizedAxios.defaults.baseURL = "http://localhost:8000/api/";
var token;
CustomizedAxios.defaults.headers.common["Content-Type"] = "multipart/form-data";
CustomizedAxios.defaults.headers.common["Accept"] = "application/json";

/*     if (localStorage.user) {
  token = JSON.parse(localStorage.user);
  CustomizedAxios.defaults.headers.common = {
    Authorization: `Bearer ${token.usersModule.token}`,
    Accept: "application/json",
  };
}  */  



export default CustomizedAxios;
