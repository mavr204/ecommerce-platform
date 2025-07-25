import axios from "axios";

let USER_REST_API_URL;

class ImageService {
  saveImage(file, id) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/images/upload";
    return axios.post(USER_REST_API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  getImage(id) {
    axios.defaults.withCredentials = true;
    USER_REST_API_URL = "http://localhost:8080/images/getimage/" + id;
    return axios.get(USER_REST_API_URL, {
      responseType: "arraybuffer",
    });
  }
}
export default new ImageService();
