import axios from 'axios';

class HttpClient {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:3000/api',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
  }

  async getData(url, params = {}) {
    try {
      const response = await this.axiosInstance.get(url, { params });
      return response.data;
    } catch (error) {
      console.error('Error appeared while trying to fetch data:', error);
      throw error;
    }
  }

  async postData(url, data = {}) {
    try {
      const response = await this.axiosInstance.post(url, data);
      return response.data;
    } catch (error) {
      console.error('Error appeared while trying to submit data:', error);
      throw error;
    }
  }
}

export default new HttpClient();
