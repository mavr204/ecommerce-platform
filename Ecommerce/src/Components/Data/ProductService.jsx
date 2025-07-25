import axios from "axios";

let USER_REST_API_URL;
class ProductService {
  getLatestProducts() {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/product/latest";
    return axios.get(USER_REST_API_URL);
  }
  saveProduct(data) {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/product/addproduct";
    return axios.post(USER_REST_API_URL, data);
  }
  getPopularProducts() {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/product/popular";
    return axios.get(USER_REST_API_URL);
  }
  getProductById(pid) {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/product/getProductbyid/";
    return axios.get(USER_REST_API_URL + pid);
  }
  // added by jeet
  getProduct() {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/product/getall";
    return axios.get(USER_REST_API_URL);
  }
  removeProduct(pid) {
    const data = { pid: pid };
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/product/removeProduct";
    return axios.post(USER_REST_API_URL, data);
  }
  setPopular(pid, pop) {
    const data = { pid: pid, popular: pop };
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/product/setpopular";
    return axios.post(USER_REST_API_URL, data);
  }
  getProductByPage(pageNum, filters) {
    let data;
    if (Object.keys(filters).length) {
      data = {
        limit: 15,
        offset: pageNum,
        filters: JSON.stringify(filters),
      };
    } else {
      data = { limit: 12, offset: pageNum };
    }
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/product/getproductbypage";
    return axios.post(USER_REST_API_URL, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  getFilteredProductByPage(pageNum, filters) {
    const data = {
      limit: 12,
      offset: pageNum,
      filters: JSON.stringify(filters),
    };
    console.log(filters);
    // axios.defaults.withCredentials = true;
    // USER_REST_API_URL = "http://localhost:8080/product/getproductbypage";
    // return axios.post(USER_REST_API_URL, data, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });
  }
}
export default new ProductService();
