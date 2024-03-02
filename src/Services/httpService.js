import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
  timeout: 50000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  let authToken;
  if (Cookies.get("authToken")) {
    authToken = JSON.parse(Cookies.get("authToken"));
  }

  let userId;
  if (Cookies.get("userId")) {
    userId = Cookies.get("userId");
  }

  return {
    ...config,
    headers: {
      ...config.headers,
      authorization: authToken ? `Bearer ${authToken}` : null,
      userId: userId ? userId : null,
    },
  };
});

const responseBody = (response) => response.data;

const requests = {
  get: (url, body) => axios.get(url, body).then(responseBody),

  post: (url, body) => instance.post(url, body).then(responseBody),

  put: (url, body) => instance.put(url, body).then(responseBody),

  patch: (url, body) => instance.patch(url, body).then(responseBody),

  delete: (url, body) => instance.delete(url, body).then(responseBody),
};

export default requests;
