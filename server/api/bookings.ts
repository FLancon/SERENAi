import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.beds24.com/v2/bookings',
      headers: {
        token: process.env.token,
      },
    };
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings from Beds24:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch bookings from Beds24',
    });
  }
});
