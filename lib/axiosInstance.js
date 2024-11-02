import axios from "axios";

// Create an Axios instance with default settings
const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v2`, // Set your API base URL here
  timeout: 100,
});

export default apiClient;
