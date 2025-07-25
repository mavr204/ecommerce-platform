import axios from "axios";

let USER_REST_API_URL;

class CartService {
  getItems() {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/cart/getcartItembyid";
    return axios.get(USER_REST_API_URL);
  }
  deleteItem(pid) {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/cart/deletecartitem/" + pid;
    return axios.post(USER_REST_API_URL);
  }
  getCount() {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/cart/getcount";
    return axios.get(USER_REST_API_URL);
  }
  updateQty(qty, pid) {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/cart/updateqty/";
    const query = qty + "/" + pid;
    return axios.post(USER_REST_API_URL + query);
  }
  isItemInCart(pid) {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/cart/isitemincart/" + pid;
    return axios.get(USER_REST_API_URL);
  }
  additem(data) {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/cart/additem";
    return axios.post(USER_REST_API_URL, data);
  }
}
export default new CartService();
