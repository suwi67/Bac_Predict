import { GoogleGenerativeAI } from "@google/generative-ai";
import { GameRound } from '../types';
import { GEMINI_MODEL_NAME } from "../constants";

// Get API key from environment variables
const API_KEY = process.env.VITE_GEMINI_API_KEY || '';

if (!API_KEY) {
  console.warn("Gemini API key not found. Gemini features will be disabled. Set VITE_GEMINI_API_KEY in your .env file.");
}

// Initialize AI client only if API_KEY is present
let genAI: GoogleGenerativeAI | null = null;

try {
  genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
} catch (error) {
  console.error("Failed to initialize Gemini client:", error);
  genAI = null;
}

const formatHistoryForPrompt = (history: GameRound[]): string => {
  if (history.length === 0) return "No games played yet.";
  return history.map(game => {
    let entry = `Result: ${game.result}`;
    if (game.pair === 'yes') entry += `, Pair: ${game.pair}`;
    if (game.natural === 'yes') entry += `, Natural: ${game.natural}`;
    if (game.bankerScore !== undefined && game.playerScore !== undefined) {
      entry += ` (Scores: B-${game.bankerScore}, P-${game.playerScore})`;
    }
    return entry;
  }).join('; ');
};

export const getGeminiInsightForBaccarat = async (history: GameRound[]): Promise<string> => {
  if (!ai) {
    return "Gemini API is not configured (API key missing or invalid). Insights unavailable.";
  }
  if (history.length < 3) { // Require some history for meaningful insight
    return "More game rounds are needed for IP-ENGINE to provide commentary.";
  }

  const recentHistory = history.slice(-20); // Consider last 20 rounds for conciseness
  const formattedHistory = formatHistoryForPrompt(recentHistory);

  const prompt = `
You are IP-ENGINE, an expert Baccarat game analyst AI.
Analyze the following recent Baccarat game history:
[${formattedHistory}]

Provide a brief, insightful, and engaging commentary about the current trends, emerging patterns, or any notable occurrences.
Your tone should be like a seasoned casino commentator: observant, a bit playful, but not making definitive future predictions.
Focus on what you see in the data. For example, mention streaks (e.g., "Banker is on a 4-win streak"), chops (alternating results), frequency of ties, or pairs if they are notable.
Keep your commentary concise, ideally 2-3 short paragraphs.
Do NOT give financial advice or encourage gambling.
Do NOT predict the next specific outcome (e.g., "Banker will win next"). Instead, talk about observed tendencies or if the shoe seems "hot" or "cold" for a particular side.
Example of good commentary: "The shoe started a bit choppy, but Banker seems to be finding its rhythm with a solid 3-win streak. Player sides are seeing fewer pairs lately. Ties have been quite rare in the last 10 hands, making for some decisive rounds!"
Example of bad commentary: "Banker is hot, bet on Banker next! You'll win for sure."

Based on the history: [${formattedHistory}], what is your expert commentary?
  `;

  try {
    if (!genAI) {
      throw new Error("Gemini AI client not initialized");
    }
    
    const model = genAI.getGenerativeModel({ 
      model: GEMINI_MODEL_NAME,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 200, // Keep it concise
      }
    });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    const text = response.text();
    if (text) {
        return text.trim();
    }
    return "IP-ENGINE is contemplating... (Received an unexpected response structure)";

  } catch (error: any) {
    console.error("Error fetching Gemini insight:", error);
    if (error.message && (error.message.includes("API key not valid") || error.message.includes("PERMISSION_DENIED"))) {
        return "IP-ENGINE's connection is down (Invalid API Key or permission issue). Please check configuration.";
    }  if (error.message && error.message.includes("Quota exceeded")) {
        return "IP-ENGINE has spoken too much for now (API Quota Exceeded). Please try again later.";
    }
    return "IP-ENGINE is currently unavailable due to a technical glitch. Please try again later.";
  }
};