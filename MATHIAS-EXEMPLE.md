// Importer la bibliothèque OpenAI
const { Configuration, OpenAIApi } = require("openai");
 
// Configurer OpenAI avec votre clé API
const configuration = new Configuration({
  apiKey: "VOTRE_CLE_API_OPENAI", // Remplacez par votre clé API OpenAI
});
const openai = new OpenAIApi(configuration);
 
// Simuler une fonction "incomingChat" qui se déclenche quand un message arrive
async function incomingChat(userMessage) {
  console.log("Message reçu de l'utilisateur :", userMessage);
 
  // Étape 3 : Envoyer le message de l'utilisateur au modèle AI pour identifier le besoin
  const aiResponse = await identifyUserNeed(userMessage);
  console.log("Besoin identifié :", aiResponse);
 
  // Étape 4 : Appeler une fonction en fonction du besoin identifié
  const result = await handleUserNeed(aiResponse);
 
  // Étape 5 : Envoyer la réponse au chat
  console.log("Réponse envoyée à l'utilisateur :", result);
  return result;
}
 
// Fonction pour identifier le besoin de l'utilisateur via GPT-4
async function identifyUserNeed(userMessage) {
  const response = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "Tu es un assistant qui identifie les besoins des utilisateurs. Tu as le choix entre 'metéo' et 'aide'",
      },
      {
        role: "user",
        content: `L'utilisateur a dit : "${userMessage}". Quel est son besoin ?`,
      },
    ],
  });
 
  // Retourner le besoin identifié par l'AI
  return response.data.choices[0].message.content;
}
 
// Fonction pour gérer le besoin identifié
async function handleUserNeed(userNeed) {
  if (userNeed.includes("météo")) {
    return "Je vais te donner la météo d'aujourd'hui.";
  } else if (userNeed.includes("aide")) {
    return "Je suis là pour t'aider ! Que puis-je faire pour toi ?";
  } else {
    return "Désolé, je ne suis pas sûr de comprendre ton besoin.";
  }
}
 
// Exemple : Appeler la fonction incomingChat avec un message utilisateur
incomingChat("Quel temps fait-il aujourd'hui ?");