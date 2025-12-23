
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const editProfileImage = async (base64Image: string, prompt: string): Promise<string | null> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1],
              mimeType: 'image/png',
            },
          },
          {
            text: `Edit this profile picture according to this instruction: ${prompt}. Return the modified image.`,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Image Edit Error:", error);
    return null;
  }
};

export const suggestSummary = async (content: any): Promise<string | null> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on this professional info: ${JSON.stringify(content)}, write a compelling 2-sentence resume summary.`,
    });
    return response.text || null;
  } catch (error) {
    console.error("Gemini Suggest Error:", error);
    return null;
  }
};
