import axios from "axios";

let USER_REST_API_URL;

class WishlistService {
  additem(data) {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/wishlist/additem";
    return axios.post(USER_REST_API_URL, data);
  }
  getItems() {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/wishlist/getall";
    return axios.get(USER_REST_API_URL);
  }
  itemExists(data) {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/wishlist/itemexists";
    return axios.post(USER_REST_API_URL, data);
  }
  removeItem(data) {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/wishlist/removeitem";
    return axios.post(USER_REST_API_URL, data);
  }
}
export default new WishlistService();
