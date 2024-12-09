import { ref } from "vue";
import OpenAI from "openai";

const isGenerating = ref(false);
const error = ref<string | null>(null);
const propertyData = ref(``);
const listPbmVisitors = ref([
  "Code Wifi",
  "Probleme Wifi",
  "early check-in",
  "late check-out",
  "nuit supplémentaire",
]);

export const useAI = () => {
  const config = useRuntimeConfig();

  const openai = new OpenAI({
    apiKey: config.public.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const generateResponse = async (message: string, context: any) => {
    isGenerating.value = true;
    error.value = null;
    propertyData.value = null;
    console.log("context ", context.value);

    // Select correct context according to the Property
    switch (context.value.propertyDetails.id) {
      //Case Pipot
      case 253239:
        propertyData.value = `You are a helpful vacation rental property manager assistant. 
        You should respond in French.
        Current booking context:
        - Guest Name: ${context.guest}
        - Check-in: ${context.arrival}
        - Check-out: ${context.departure} 
        - Property ID: ${context.propertyId}
        - Room ID: ${context.roomId}
        
        Be professional, friendly, and provide accurate information based on the context.`;
        break;

      default:
        propertyData.value = `You are a helpful Kitchen Chef assistant. 
        You should respond in French.
        You should always try to answer the question in a manner of a kitchen recipe.`;
        break;
    }

    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `Tu es un assistant qui identifie les besoins des utilisateurs. Tu as le choix entre ${listPbmVisitors} `,
          },
          {
            role: "system",
            content: propertyData.value,
          },
          {
            role: "user",
            content: `Voici l'historique des échanges : ${context.value.messages}`,
          },
          {
            role: "user",
            content: `L'utilisateur a dit : "${context.value.lastMessage}". Quel est son besoin ?`,
          },
        ],
        model: "gpt-3.5-turbo",
      });

      return completion.choices[0]?.message?.content || null;
    } catch (e) {
      error.value = "Failed to generate AI response";
      console.error("Error generating AI response:", e);
      return null;
    } finally {
      isGenerating.value = false;
    }
  };

  // Simuler une fonction "incomingChat" qui se déclenche quand un message arrive
  async function incomingChat(context: any) {
    isGenerating.value = true;
    error.value = null;

    console.log("Message reçu de l'utilisateur :", context.value.lastMessage);

    /* 
        - Guest Name: ${context.guest}
        - Check-in: ${context.arrival}
        - Check-out: ${context.departure} 
        - Property ID: ${context.propertyId}
        - Room ID: ${context.roomId}
    */

    // Étape 1 : Envoyer le message de l'utilisateur au modèle AI pour identifier le besoin
    const aiResponse = await identifyUserNeed(context);
    console.log("Besoin identifié :", aiResponse);

    // Étape 2 : Récuperer la data du logement
    const propertyDetail = await getPropertyDetail(
      context.value.propertyDetails.id
    );
    console.log(config.OPENAI_API_KEY);

    // Étape 3 : Appeler une fonction en fonction du besoin identifié
    const result = await handleUserNeed(aiResponse, propertyDetail, context);

    // Étape 4 : Envoyer la réponse au chat
    console.log("Réponse envoyée à l'utilisateur :", result);
    return result;
  }

  // Fonction pour identifier le besoin de l'utilisateur via GPT-4
  async function identifyUserNeed(context) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `Tu es un assistant qui identifie les besoins des utilisateurs. Tu as le choix entre ${listPbmVisitors.value}`,
          },
          {
            role: "user",
            content: `Voici l'historique des échanges : ${context.value.messages}`,
          },
          {
            role: "user",
            content: `L'utilisateur a dit : "${context.value.lastMessage}". Quel est son besoin ?`,
          },
        ],
      });

      // Retourner le besoin identifié par l'AI
      return response.choices[0]?.message?.content;
    } catch (e) {
      error.value = "Failed to generate AI response";
      console.error("Error generating AI response:", e);
      return null;
    }
  }

  // Fonction pour récupérer les details de la propiétée
  async function getPropertyDetail(propertyId) {
    switch (propertyId) {
      //Case Pipot
      case 253239:
        return `Here is a list of information about the appartment:
        The wifi password of the appartment is : '1234', it is not noted in the welcome leaflet, but written in Morse on the fridge, and on the bathroom mirror.
        The pillow are located in the container next to the couch
        The Coffee Machine is a Dolce Gusto and has 2 coffee capsule for your stay`;

      default:
        return `You are a helpful Kitchen Chef assistant. 
        You should respond in French.
        You should always try to answer the question in a manner of a kitchen recipe.`;
    }
  }

  // Fonction pour gérer le besoin identifié
  async function handleUserNeed(userNeed, propertyDetail, context) {
    if (userNeed.includes("météo")) {
      return "Je vais te donner la météo d'aujourd'hui.";
    } else if (userNeed.includes("aide")) {
      return "Je suis là pour t'aider ! Que puis-je faire pour toi ?";
    } else if (userNeed.includes("Code Wifi")) {
      console.log("demande code wifi detected");
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
          You are a helpful vacation rental property manager assistant. 
          You should respond in the langage the visitor is talking.
          Current booking context:
            - Guest Name: ${context.guest}
            - Check-in: ${context.arrival}
            - Check-out: ${context.departure} 
            - Property ID: ${context.propertyId}
            - Room ID: ${context.roomId}

            ${propertyDetail}
          
          Here is the historic of message of the conversation with the visitor: ${context.value.messages}.
        
          Be professional, friendly, and provide accurate information based on the context.`,
          },
          {
            role: "user",
            content: `L'utilisateur a ce besoin : ${userNeed}. Apportes-lui une réponse.`,
          },
        ],
      });

      return response.choices[0]?.message?.content;
    } else if (userNeed.includes("Probleme Wifi")) {
      console.log("prbm wifi detected");
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
          You are a helpful vacation rental property manager assistant. 
          You should respond in the langage the visitor is talking.
          Current booking context:
            - Guest Name: ${context.guest}
            - Check-in: ${context.arrival}
            - Check-out: ${context.departure} 
            - Property ID: ${context.propertyId}
            - Room ID: ${context.roomId}
        
          Be professional, friendly, and provide accurate information based on the context.`,
          },
          {
            role: "system",
            content: `Voici les informations concernant le logement : ${propertyDetail}`,
          },
          {
            role: "user",
            content: `Voici l'historique des échanges : ${context.value.messages}`,
          },
          {
            role: "user",
            content: `L'utilisateur a ce besoin : ${userNeed}. Apportes-lui une réponse.`,
          },
        ],
      });
      return response.choices[0]?.message?.content;
    } else {
      return "Désolé, je ne suis pas sûr de comprendre votre besoin. Je vais contacter un responsable.";
    }
  }

  return {
    isGenerating,
    error,
    generateResponse,
    incomingChat,
  };
};
