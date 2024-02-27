import { createUser } from "Models/endpointes";
import { createKyc } from "Models/endpointes";
import { createAddress } from "Models/endpointes";
import { loginUser } from "Models/endpointes";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

class UserController {
  async login(body) {
    try {
      const { userId, password } = body;
      console.log(userId, password);
      console.log(body);

      const response = await axios.post(API_BASE_URL + loginUser, {
        userId: userId,
        password: password,
      });
      console.log(response, response.json());
      return response.data;
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
}

export default UserController;
