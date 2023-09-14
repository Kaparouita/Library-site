import axios from 'axios';
import API_URL from '../../configs/config';
import { Review } from '../book/Book';

export const UserServices = {
    getUsers: async () => {
        try {
            const response = await axios.get<any[]>(`${API_URL}/users`, {});
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    deleteUser: async (userId: number) => {
        try {
            const response = await axios.delete<any>(`${API_URL}/users/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getUser: async (userId: number) => {
        try {
            const response = await axios.get<any>(`${API_URL}/users/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    updateUser: async (user: any) => {
        try {
            const response = await axios.put<any>(
            `${API_URL}/users/${user.id}`,
            user
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getUsersPerType: async (group: string) => {
        try {
            const response = await axios.get<any[]>(
            `${API_URL}/users/perType?group=${group}`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    reviewBook: async (review : Review,user_id : number) => {
        try {
            const response = await axios.post<any[]>(
            `${API_URL}/users/${user_id}/review`,
                review
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default UserServices;
