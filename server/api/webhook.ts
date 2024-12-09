import axios from "axios";

export default defineEventHandler(async (event) => {
  const configRunTime = useRuntimeConfig();

  console.log("webhook; ", event.node.req.url)
  console.log("Webhook2: ", event.node.req.IncomingMessage)

  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://api.beds24.com/" + event.node.req.url,
      headers: {
        token: configRunTime.token,
      },
    };
    const response = await axios(config);
    console.error
    return response.data;

  } catch (error) {
    console.error("Error retrieving webhook message:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to load conversations",
    });
  }
});
