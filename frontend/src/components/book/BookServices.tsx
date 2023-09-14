import axios from 'axios';
import API_URL from '../../configs/config';
import { BookPagin,Book } from './Book';

export const BookServices = {
  getBooks: async (pagin: BookPagin) => {
    try {
      const response = await axios.get<any>(`${API_URL}/books`, {
        params: pagin,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getBooksPerUni: async (group: string) => {
    try {
      const response = await axios.get<any[]>(`${API_URL}/books/perUni?group=${group}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getBook: async (bookId: number) => {
    try {
        const response = await axios.get<any>(`${API_URL}/books/${bookId}`);
        return response.data;
    } catch (error) {
        throw error;
    }   
  },
  addBook: async (book : Book) => {
    try {
        const response = await axios.post<any>(
        `${API_URL}/books`,
            book
        );
        return response.data;
    } catch (error) {
        throw error;
    }
  },
};

// Indicate the return type using TypeScript annotations
// Returns a Promise of type any[] (you can replace any with the actual response type)
export default BookServices;
