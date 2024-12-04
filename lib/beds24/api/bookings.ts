import { AxiosInstance } from 'axios';
import { Booking, BookingFilters, ApiResponse } from '../types';
import { Logger } from '../utils/logger';

export class BookingsApi {
  private readonly logger: Logger;

  constructor(private readonly axios: AxiosInstance) {
    this.logger = new Logger('MessagesApi');
  }

  /**
   * Retrieve a list of bookings
   * @param {BookingFilters} filters - Optional filters for the bookings list
   * @returns {Promise<ApiResponse<Booking[]>>} List of bookings
   */
  async list(filters?: BookingFilters): Promise<ApiResponse<Booking[]>> {
    try {
      this.logger.debug('Fetching bookings with filters:', filters);
      //Arrival from 2024 retrieves all bookings
      const { data } = await this.axios.get('/bookings?arrivalFrom=2024-01-01', { params: filters});
      return data;
    } catch (error) {
      this.logger.error('Error fetching bookings:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Get a single booking by ID
   * @param {number} id - Booking ID
   * @returns {Promise<ApiResponse<Booking>>} Booking details
   */
  async get(id: number): Promise<ApiResponse<Booking>> {
    try {
      this.logger.debug('Fetching bookings with id:', id);
      const { data } = await this.axios.get(`/bookings?id=${id}`);
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 404:
          throw new Error('Booking not found');
        case 429:
          throw new Error('Rate limit exceeded');
        default:
          throw new Error(
            data.message || 'An error occurred with the bookings API'
          );
      }
    }
    throw error;
  }
}
