import axios from "axios";

let USER_REST_API_URL;

class UserService {
  getAllUsers(data) {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/user/all";
    return axios.get(USER_REST_API_URL, data);
  }

  addUser(data) {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/user/adduser";
    return axios.post(USER_REST_API_URL, data);
  }

  logout() {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/user/logout";
    return axios.get(USER_REST_API_URL);
  }

  authUser(email, pwd) {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/user/authuser";
    return axios.post(
      USER_REST_API_URL,
      { email, pwd },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  loginCheck() {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/user/logincheck";
    return axios.get(USER_REST_API_URL);
  }

  userExists(email) {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/user/userexists";
    return axios.post(USER_REST_API_URL, { email: email });
  }

  phoneExists(phone) {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/user/phoneexists";
    return axios.post(USER_REST_API_URL, { phone: phone });
  }

  getUser() {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/user/getbyid";
    return axios.get(USER_REST_API_URL);
  }

  authPassword(password) {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/user/authuserpassword";
    return axios.post(USER_REST_API_URL, { pwd: password });
  }
  updatePassword(password) {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/user/updateuserpassword";
    return axios.post(USER_REST_API_URL, { pwd: password });
  }
  updateDetails(data) {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/user/updateuserdetails";
    return axios.post(USER_REST_API_URL, data);
  }
  isAdmin() {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/user/isadmin";
    return axios.get(USER_REST_API_URL);
  }
  isAdminByUid(email) {
    const data = { email: email };
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/user/isadminbyuid";
    return axios.post(USER_REST_API_URL, data);
  }

  removeUser(uid) {
    const data = { uid: uid };
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/user/removeuser";
    return axios.post(USER_REST_API_URL, data);
  }
}
export default new UserService();
