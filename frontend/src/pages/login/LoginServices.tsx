import axios from 'axios';
import API_URL from '../../configs/config';

interface UserData {
  id: number;
  username: string;
  user_type: string;
  // Add more fields as needed
}

const loginservice = {
  login: async (username: string, password: string): Promise<UserData> => {
    try {
      const response = await axios.post<UserData>(`${API_URL}/login`, { username, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // Add other login-related functions here, e.g., logout, registration, etc.
};

export default loginservice;
