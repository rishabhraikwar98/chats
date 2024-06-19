import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
// crop = fit or pad
export const UploadImage = async (file, crop = "pad") => {
  axios.defaults.headers.common["Content-Type"] = "multipart/form-data"
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await axios.post(BASE_URL + "/api/v1/upload", formData, {
      params: {
        crop,
      }
    });
    const image_url = response.data.image_url;
    return image_url;
  } catch (error) {
    console.error(error);
  }
};
