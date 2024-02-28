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
  async login(body) {
    try {
      const response = await axios.post(API_BASE_URL + loginUser, body);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }

  async registerUser(data) {
    try {
      // console.log(user);
      const response = await axios.post(API_BASE_URL + createUser, data);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
  async createAddress(data) {
    try {
      const response = await axios.post(API_BASE_URL + createAddress, data);
      console.log(response);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async createKycDetails(data) {
    try {
      const response = await axios.post(API_BASE_URL + createKyc, data);
      console.log(response);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async verifyOtp(data) {
    try {
      const response = await axios.post(API_BASE_URL + otpVerify, { otp: data });
      console.log(response);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async getUserByIdFromAPI(data) {
    try {
      const response = await axios.get(`${API_BASE_URL}${getUserByUserId}/${data}`);
      console.log(response);
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
      console.log(response);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
}

export default UserController;
