import { ref, computed } from 'vue';
import { format, formatDistanceToNow } from 'date-fns';

interface Message {
  id: number;
  content: string;
  time: string;
  source: 'guest' | 'host';
}

interface Conversation {
  id: number;
  guest: string;
  apiSourceId: number;
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

  const fetchMessages = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      // For development, use the local API endpoint
      const response = await fetch('/api/conversations');
      const data = await response.json();
      conversations.value = data.conversations.map((conv: any) => ({
        ...conv,
        messages: conv.messages.map((msg: any) => ({
          ...msg,
          source: msg.isGuest ? 'guest' : 'host',
        })),
      }));
    } catch (e) {
      console.error('Error fetching messages:', e);
      error.value = 'Failed to load messages';
    } finally {
      isLoading.value = false;
    }
  };

  const selectConversation = (id: number) => {
    selectedConversationId.value = id;
  };

  const formatMessageDate = (date: string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  return {
    conversations,
    selectedConversation,
    isLoading,
    error,
    fetchMessages,
    selectConversation,
    formatMessageDate,
  };
};