import axios from "axios";

let USER_REST_API_URL;

class OrderService {
  getAllOrders() {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/orders/all";
    return axios.get(USER_REST_API_URL);
  }
  getOrders() {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/orders/getorders";
    return axios.get(USER_REST_API_URL);
  }
  getOrderById(id) {
    const data = { orderId: id };
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/orders/getorderbyid";
    return axios.post(USER_REST_API_URL, data);
  }
  orderExists() {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/orders/orderexists";
    return axios.get(USER_REST_API_URL);
  }
  orderExistsById(id) {
    const data = { pid: id };
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/orders/orderexistsbyid";
    return axios.post(USER_REST_API_URL, data);
  }
  removeOrder(orderId) {
    const data = { orderId: orderId };
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/orders/removeOrder";
    return axios.post(USER_REST_API_URL, data);
  }
  setOrderStatus(oid, ost) {
    const data = { orderId: oid, orderStatus: ost };
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/orders/updatestatus";
    return axios.post(USER_REST_API_URL, data);
  }
  addOrder(pid, transactionId) {
    const data = { pid: pid, transactionId: transactionId };
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/orders/addorder";
    return axios.post(USER_REST_API_URL, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
export default new OrderService();
