
import { createConnection } from "Models/endpointes";
import { getAllPublished } from "Models/endpointes";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

class ProductController {
    async getPublished() {
        try {
            const response = await axios.get(`${API_BASE_URL + getAllPublished}`);

            return response?.data;
        } catch (error) {
            throw error;
        }
    }
    async createConnections() {
        try {
            const response = await axios.post(`${API_BASE_URL + createConnection}`);
            console.log("response=>", response);
            return response?.data;
        } catch (error) {
            throw error;
        }
    }

}

export default ProductController;
