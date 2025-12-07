import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }
  return ai;
};

export const getHealthAdvice = async (symptoms: string) => {
  try {
    const aiInstance = getAI();
    const response = await aiInstance.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `User symptoms: ${symptoms}. 
      Act as a medical triage assistant. 
      1. Suggest a likely specialist type (e.g., Cardiologist, Dermatologist).
      2. Provide a brief 1-sentence general advice (disclaimer: not medical advice).
      3. Recommend 2-3 specific questions the user should ask the doctor.
      Format as JSON: { "specialist": string, "advice": string, "questions": string[] }`,
      config: {
        responseMimeType: "application/json",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    // Fallback JSON if API fails or key is missing
    return JSON.stringify({
      specialist: "General Physician",
      advice: "It is recommended to see a General Physician for an initial assessment.",
      questions: ["How long have you had these symptoms?", "Is the pain sharp or dull?"]
    });
  }
};
