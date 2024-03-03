import axios from "axios";

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
  let authToken, userId;
  const cookieArray = document.cookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].trim();
    if (cookie.startsWith("userId" + "=")) {
      userId = cookie.substring("userId".length + 1);
    } else if (cookie.startsWith("authToken" + "=")) {
      authToken = cookie.substring("authToken".length + 1);
    } else if (userId && authToken) {
      break;
    }
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

const requests = {
  get: (url) => instance.get(url),
  post: (url, body) => instance.post(url, body),
  put: (url, body) => instance.put(url, body),
  delete: (url) => instance.delete(url),
};

export default requests;
