import { AxiosInstance } from "axios";
import { Message, MessageFilters, ApiResponse } from "../types";
import { Logger } from "../utils/logger";

export class MessagesApi {
  private readonly logger: Logger;

  constructor(private readonly axios: AxiosInstance) {
    this.logger = new Logger("MessagesApi");
  }

  /**
   * List all messages
   */
  async list(filters?: MessageFilters): Promise<ApiResponse<Message[]>> {
    try {
      this.logger.info("Fetching messages with filters:", filters);
      const { data } = await this.axios.get("/bookings/messages", {
        params: filters,
      });
      return data;
    } catch (error) {
      this.logger.error("Error fetching messages:", error);
      throw this.handleError(error);
    }
  }

  /**
   * Send a new message
   */
  async send(body: any): Promise<ApiResponse<Message>> {
    try {
      this.logger.debug(`Sending message for booking ${body.bookingId}`);
      const { data } = await this.axios.post("/bookings/messages", [
        {
          bookingId: body.bookingId,
          message: body.message,
        },
      ]);
      return data;
    } catch (error) {
      this.logger.error("Error sending message:", error);
      throw this.handleError(error);
    }
  }

  /**
   * Update Message as Read
   */
  async markAsRead(body: any): Promise<ApiResponse<Message>> {
    try {
      this.logger.debug(`Updating message as read, messageId: ${body.messageId}`);
      const { data } = await this.axios.patch(`/bookings/messages?id=${body.messageId}`, [
        {
          read: true
        },
      ]);
      return data;
    } catch (error) {
      this.logger.error("Error sending message:", error);
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 401:
          throw new Error("Invalid API token");
        case 404:
          throw new Error("Booking not found");
        case 429:
          throw new Error("Rate limit exceeded");
        default:
          throw new Error(
            data.message || "An error occurred with the messages API"
          );
      }
    }
    throw error;
  }
}
