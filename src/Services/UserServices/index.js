import { createUser } from "Models/endpointes";
import { createKyc } from "Models/endpointes";
import { getUserByUserId } from "Models/endpointes";
import { resendOtpRoute } from "Models/endpointes";
import { otpVerify } from "Models/endpointes";
import { createAddress } from "Models/endpointes";
import { loginUser } from "Models/endpointes";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

class UserController {
  async getCookie(name) {
    const cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      const cookie = cookieArray[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  async login(body) {
    try {
      const authToken = await this.getCookie('authToken') ?? null;
      const response = await axios.post(API_BASE_URL + loginUser, body,);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }

  async registerUser(data) {
    try {
      const response = await axios.post(API_BASE_URL + createUser, data);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }

  async createAddress(data) {
    try {
      const response = await axios.post(API_BASE_URL + createAddress, data);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createKycDetails(data) {
    try {
      const response = await axios.post(API_BASE_URL + createKyc, data);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async verifyOtp(data) {
    try {
      const response = await axios.post(API_BASE_URL + otpVerify, { otp: data });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getUserByIdFromAPI(data) {
    try {
      const authToken = await this.getCookie('authToken') ?? null;

      const response = await axios.get(`${API_BASE_URL}${getUserByUserId}/${data}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      });
      return response?.data;
    } catch (error) {
      throw error;
    }
  }

  async resendOtp(data) {
    try {
      const response = await axios.post(API_BASE_URL + resendOtpRoute, {
        id: data
      });
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
}

export default UserController;
