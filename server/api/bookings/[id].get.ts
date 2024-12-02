import { Beds24Client } from '~/lib/beds24';

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    const client = new Beds24Client({ apiKey: config.token });
    const id = parseInt(event.context.params.id);

    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid booking ID'
      });
    }

    const response = await client.bookings.get(id);
    return response;
  } catch (error) {
    console.error('Error fetching booking:', error);
    throw createError({
      statusCode: error.response?.status || 500,
      message: error.message || 'Failed to fetch booking'
    });
  }
});