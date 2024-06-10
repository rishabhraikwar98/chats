import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const token = localStorage.getItem("access_token");
// crop = fit or pad
export const UploadImage = async (file, crop = "pad") => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await axios.post(BASE_URL + "/api/v1/upload", formData, {
      params: {
        crop,
      },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    });
    const image_url = response.data.image_url;
    return image_url;
  } catch (error) {
    console.error(error);
  }
};
