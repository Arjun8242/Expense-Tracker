import { API_PATHS } from "./apipaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  if (!imageFile) return null; // Don't try to upload if no file

  const formData = new FormData();
  formData.append("image", imageFile); // key must match backend

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // important!
        },
      }
    );

    return response.data; // Return response data
  } catch (error) {
    console.error("Error uploading the image:", error.response || error);
    throw error; // Rethrow for handling in SignUp.jsx
  }
};

export default uploadImage;
