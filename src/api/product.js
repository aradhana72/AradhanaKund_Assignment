import axios from "axios";

export const getProducts = async () => {
  try {
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
