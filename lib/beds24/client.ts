import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import { Beds24Config } from './types';
import { createConfig } from './config';
import { PropertiesApi } from './api/properties';
import { BookingsApi } from './api/bookings';
import { AvailabilityApi } from './api/availability';
import { RatesApi } from './api/rates';
import { ChannelsApi } from './api/channels';
import { SystemApi } from './api/system';
import { MessagesApi } from './api/messages';

export class Beds24Client {
  private readonly config: Beds24Config;
  private readonly axios: AxiosInstance;

  public readonly properties: PropertiesApi;
  public readonly bookings: BookingsApi;
  public readonly availability: AvailabilityApi;
  public readonly rates: RatesApi;
  public readonly channels: ChannelsApi;
  public readonly system: SystemApi;
  public readonly messages: MessagesApi;

  constructor(config: Partial<Beds24Config>) {
    this.config = createConfig(config);
    this.axios = this.createAxiosInstance();

    // Initialize API modules
    this.properties = new PropertiesApi(this.axios);
    this.bookings = new BookingsApi(this.axios);
    this.availability = new AvailabilityApi(this.axios);
    this.rates = new RatesApi(this.axios);
    this.channels = new ChannelsApi(this.axios);
    this.system = new SystemApi(this.axios);
    this.messages = new MessagesApi(this.axios);
  }

  private createAxiosInstance(): AxiosInstance {
    const instance = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'token': this.config.token, // Use token header instead of Authorization
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    // Configure retry logic
    axiosRetry(instance, {
      retries: this.config.retries,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition: (error) => {
        return axiosRetry.isNetworkOrIdempotentRequestError(error) ||
          error.response?.status === 429;
      }
    });

    // Add response interceptor for error handling
    instance.interceptors.response.use(
      response => response,
      error => {
        if (error.response) {
          const { status } = error.response;
          if (status === 401) {
            console.error('Invalid API token');
          } else if (status === 429) {
            const retryAfter = error.response.headers['retry-after'];
            error.retryAfter = retryAfter ? parseInt(retryAfter, 10) : 60;
          }
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }
}