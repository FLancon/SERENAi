import { ref, computed } from "vue";
import { format, formatDistanceToNow } from "date-fns";
import process from "process";

interface ApiMessage {
  id: number;
  bookingId: number;
  message: string;
  time: string;
  source: "guest" | "host";
  propertyId: number;
  roomId: number;
  read: boolean;
  authorOwnerId: number | null;
}

interface Message {
  id: number;
  content: string;
  time: string;
  source: "guest" | "host";
}

interface Conversation {
  id: number;
  bookingId: number;
  guest: string;
  apiSourceId: number;
  bookingDetails: Object;
  lastMessage: string;
  lastMessageTime: string;
  messages: Message[];
}

const conversations = ref<Conversation[]>([]);

const selectedConversationId = ref<number | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);

export const useMessages = () => {
  const selectedConversation = computed(() =>
    conversations.value.find((c) => c.id === selectedConversationId.value)
  );

  const formatMessageData = (apiMessages: ApiMessage[]) => {
    // Group messages by bookingId
    const messagesByBooking = apiMessages.reduce((acc, msg) => {
      if (!acc[msg.bookingId]) {
        acc[msg.bookingId] = [];
      }
      acc[msg.bookingId].push(msg);
      return acc;
    }, {} as Record<number, ApiMessage[]>);

    // Convert to conversations format
    return Object.entries(messagesByBooking).map(([bookingId, messages]) => {
      const latestMessage = messages[0];

      return {
        id: parseInt(bookingId),
        bookingId: parseInt(bookingId),
        guest: `Guest ${bookingId}`, // You might want to fetch guest names from a separate API
        apiSourceId: 19, // This should come from your booking data
        bookingDetails: {},
        lastMessage: latestMessage.message,
        lastMessageTime: new Date(latestMessage.time),
        lastMessageTimeDistance: formatDistanceToNow(new Date(latestMessage.time), {
          addSuffix: true,
        }),
        messages: messages
          .map((msg) => ({
            id: msg.id,
            content: msg.message,
            time: format(new Date(msg.time), "MM/dd/yyyy HH:mm"),
            source: msg.source,
            read: msg.read
          }))
          .reverse(),
      };
    });
  };

  const fetchMessages = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      // Fetch All Messages
      const response = await fetch("/api/bookings/messages");
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error?.message || "Failed to fetch messages");
      }

      conversations.value = formatMessageData(data.data);

      // Fetch All Bookings Infos
      const response2 = await fetch("/api/bookings");
      const bookingInfo = await response2.json();

      //Fetch Property List & Property Details
      const response3 = await fetch("/api/properties");
      const propertyInfo = await response3.json();

      // Add BookingDetails & PropertyDetails to Conversations
      conversations.value.forEach((conversation) => {
        const matchedBooking = bookingInfo.data.find(
          (booking) => booking.id === conversation.bookingId
        );
        if (matchedBooking) {
          conversation.bookingDetails = matchedBooking;
        }
        const matchedProperty = propertyInfo.data.find(
          (property) => property.id === conversation.bookingDetails.propertyId
        );
        if (matchedProperty) {
          conversation.propertyDetails = matchedProperty;
        }
      });

      // Sort Conversations by lastMessageTime
      conversations.value.sort((a, b) => {
        return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
      });

    } catch (e) {
      console.error("Error fetching messages:", e);
      error.value = "Failed to load messages";
    } finally {
      isLoading.value = false;
    }
  };

  const selectConversation = (id: number) => {
    selectedConversationId.value = id;
  };

  const sendMessage = async (content: string) => {
    if (!selectedConversation.value || !content.trim()) return;

    try {
      const response = await fetch("/api/bookings/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId: selectedConversation.value.id,
          message: content.trim(),
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error?.message || "Failed to send message");
      }

      // Update the conversation with the new message
      const newMessage = {
        id: data.data.id,
        content: content.trim(),
        time: format(new Date(), "HH:mm"),
        source: "host" as const,
      };

      selectedConversation.value.messages.push(newMessage);
      selectedConversation.value.lastMessage = content.trim();
      selectedConversation.value.lastMessageTime = "Just now";
    } catch (e) {
      console.error("Error sending message:", e);
      error.value = "Failed to send message";
      throw e;
    }
  };

  return {
    conversations,
    selectedConversation,
    isLoading,
    error,
    fetchMessages,
    selectConversation,
    sendMessage,
  };
};
