
import { createConnection } from "Models/endpointes";
import { getConnectionByUserID } from "Models/endpointes";
import { getAllPublished } from "Models/endpointes";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

class ProductController {
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

    async getPublished() {
        try {
            const authToken = await this.getCookie('authToken') ?? null;

            const response = await axios.get(`${API_BASE_URL + getAllPublished}`, {
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
    async createConnections(storage, id) {
        try {
            const authToken = await this.getCookie('authToken') ?? null;

            const response = await axios.post(`${API_BASE_URL + createConnection}`, {
                storage: storage,
                userId: id
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            });
            console.log("response=>", response);
            return response?.data;
        } catch (error) {
            throw error;
        }
    }
    async getConnectionByuserId(id) {
        console.log("userID=>", id);
        try {
            const response = await axios.get(`${API_BASE_URL + getConnectionByUserID}`, {
                userId: id
            });
            console.log("response=>", response);
            return response?.data;
        } catch (error) {
            throw error;
        }
    }

}

export default ProductController;
