import { ref, computed } from "vue"

export interface Message {
  id: number
  content: string
  time: string
  isGuest: boolean
}

export interface Conversation {
  id: number
  guest: string
  online: boolean
  lastMessage: string
  lastMessageTime: string
  messages: Message[]
}

const conversations = ref<Conversation[]>([])
const selectedConversationId = ref<number | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

export const useConversations = () => {
  const selectedConversation = computed(() => 
    conversations.value.find(c => c.id === selectedConversationId.value)
  )

  const fetchConversations = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      // In the future, replace this with the webhook URL
      const response = await fetch("/api/conversations")
      const data = await response.json()
      conversations.value = data.conversations
    } catch (e) {
      error.value = "Failed to load conversations"
      console.error("Error fetching conversations:", e)
    } finally {
      isLoading.value = false
    }
  }

  const selectConversation = (conversationId: number) => {
    selectedConversationId.value = conversationId
  }

  const sendMessage = async (content: string) => {
    if (!selectedConversation.value || !content.trim()) return

    const newMessage = {
      id: Date.now(),
      content,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isGuest: false
    }

    try {
      // In the future, send to webhook
      // await fetch("/api/messages", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     conversationId: selectedConversation.value.id,
      //     message: newMessage
      //   })
      // })

      // For now, update locally
      selectedConversation.value.messages.push(newMessage)
      selectedConversation.value.lastMessage = content
      selectedConversation.value.lastMessageTime = "Just now"
    } catch (e) {
      error.value = "Failed to send message"
      console.error("Error sending message:", e)
    }
  }

  return {
    conversations,
    selectedConversation,
    isLoading,
    error,
    fetchConversations,
    selectConversation,
    sendMessage
  }
}