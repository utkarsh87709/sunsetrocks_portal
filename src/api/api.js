import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// Axios instance
const api = axios.create({
  baseURL: "https://webbackend-sse-dev-cus-001.azurewebsites.net/v1/admin",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

// ----------- API Functions -----------

// Login
export const login = async (email, password) => {
  try {
    // 🔹 Hardcoded check for test credentials
    if (email === "utkarsh@gmail.com" && password === "12345678") {
      const fakeResponse = {
        meta: { status: true, message: "Login successful (mocked)" },
        data: {
          token: "fake-token-123456",
          role: "admin",
        },
      };

      // set cookies like normal
      Cookies.set("token", fakeResponse.data.token, { expires: 7 });
      Cookies.set("role", fakeResponse.data.role, { expires: 7 });

      return fakeResponse;
    }

    // 🔹 Otherwise, call the real API
    const res = await axios.post("https://webbackend-sse-dev-cus-001.azurewebsites.net/v1/admin/login", { emailId: email, password });

    if (res.data?.meta?.status && res.data?.data?.token) {
      Cookies.set("token", res.data.data.token, { expires: 7 });
      Cookies.set("role", res.data.data.role, { expires: 7 });
      return res.data;
    } else {
      throw new Error(res.data?.meta?.message || "Login failed");
    }
  } catch (err) {
    return {
      meta: {
        status: false,
        message: err.message || "Something went wrong",
      },
      data: {},
    };
  }
};

// Logout
export const logout = async () => {
  try {
    Cookies.remove('token');
    Cookies.remove('role');
    useNavigate('/l')
  } catch (err) {
    console.error("Logout API failed", err);
  } finally {
    Cookies.remove("token");
    Cookies.remove("role");
  }
};

// Generic POST (automatically adds token)
export const post = async (url, data = {}) => {
  const res = await api.post(url, data);
  return res.data;
};

// Blob POST for file downloads
export const blobpost = async (url, data = {}) => {
  const res = await api.post(url, data, {
    responseType: 'blob'
  });
  return res;
};