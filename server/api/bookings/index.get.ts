import { Beds24Client } from '~/lib/beds24';

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    const client = new Beds24Client({ apiKey: config.token });
    const query = getQuery(event);

    const filters = {
      propertyId: query.propertyId ? parseInt(query.propertyId as string) : undefined,
      status: query.status as 'confirmed' | 'pending' | 'cancelled',
      dateFrom: query.dateFrom ? new Date(query.dateFrom as string) : undefined,
      dateTo: query.dateTo ? new Date(query.dateTo as string) : undefined,
      modifiedSince: query.modifiedSince ? new Date(query.modifiedSince as string) : undefined,
      page: query.page ? parseInt(query.page as string) : undefined,
      limit: query.limit ? parseInt(query.limit as string) : undefined
    };

    const response = await client.bookings.list(filters);
    return response;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw createError({
      statusCode: error.response?.status || 500,
      message: error.message || 'Failed to fetch bookings'
    });
  }
});