import axios from "axios";

let USER_REST_API_URL;
class ProductSpecsService {
  getProductSpec(pid) {
    USER_REST_API_URL =
      "http://localhost:8080/productDetails/getproductdetailsbyid/" + pid;
    return axios.get(USER_REST_API_URL);
  }
  addProductDetails(data) {
    USER_REST_API_URL =
      "http://localhost:8080/productDetails/addproductdetails";
    return axios.post(USER_REST_API_URL, data);
  }
}

export default new ProductSpecsService();
