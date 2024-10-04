import axios from "axios";

const BASE_URL = "https://api-open.data.gov.sg/v2/real-time/api";

const govdataApi = axios.create({
  baseURL: BASE_URL,
});

export default govdataApi;
