import { AxiosInstance } from 'axios';
import { ApiResponse } from '../types';

export class SystemApi {
  constructor(private readonly axios: AxiosInstance) {}

  /**
   * Get system status
   */
  async getStatus(): Promise<ApiResponse<any>> {
    try {
      const { data } = await this.axios.get('/system/status');
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 429:
          throw new Error('Rate limit exceeded');
        default:
          throw new Error(data.message || 'An error occurred with the system API');
      }
    }
    throw error;
  }
}