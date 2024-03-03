import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const instance = axios.create({
  baseURL: `${API_BASE_URL}`,
  timeout: 50000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  let authToken, userId;

  const cookieArray = document.cookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].trim();
    if (cookie.startsWith("userId" + "=")) {
      userId = cookie.substring(String("userId").length + 1);
    } else if (cookie.startsWith("authToken" + "=")) {
      authToken = cookie.substring(String("authToken").length + 1);
    } else if (userId && authToken) {
      break;
    }
  }
  console.log(userId, authToken);
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
  get: (url) => instance.get(url).then(responseBody),

  post: (url, body) => instance.post(url, body).then(responseBody),

  put: (url, body) => instance.put(url, body).then(responseBody),

  delete: (url) => instance.delete(url).then(responseBody),
};

export default requests;
