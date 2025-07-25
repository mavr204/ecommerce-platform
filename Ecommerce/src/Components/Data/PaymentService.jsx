import axios from "axios";

let USER_REST_API_URL;

class PaymentService {
  setPayment(method, transactionAccNo, amount) {
    const data = {
      method: method,
      transactionAccNo: transactionAccNo,
      amount: amount,
    };
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/payments/addpay";
    return axios.post(USER_REST_API_URL, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
export default new PaymentService();
