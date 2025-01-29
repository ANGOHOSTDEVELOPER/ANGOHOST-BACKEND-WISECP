import axios from 'axios';

const baseURL = process.env.WISECP_API_URL;
const apiKey = process.env.WISECP_API_KEY;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    "Apikey": `${apiKey}`,
  }
});

export default api;