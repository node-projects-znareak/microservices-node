import axios from "axios";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  const { data } = await axios.post(
    "https://api.imgbb.com/1/upload",
    formData,
    {
      params: {
        key: "0ef894d905949dbc374f9cdcec79e63b",
        // expiration: 259200,
      },
    }
  );
  return data?.data?.url;
}