import { createUser } from "Models/endpointes";
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
      const { fullName, initial, phone, email, password, sponsorId, placementId } = data;
      const response = await axios.post(API_BASE_URL + createUser, {
        fullName: fullName,
        initial: initial,
        phone: phone,
        email: email,
        password: password,
        sponsorId: sponsorId,
        placementId: placementId,
      });
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
  async createAddress(data) {
    try {
      const { street1, street2, city, state, country, postalCode } = data;
      const response = await axios.post(API_BASE_URL + createAddress, {
        street1: street1,
        street2: street2,
        city: city,
        state: state,
        country: country,
        postalCode: postalCode,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default UserController;
