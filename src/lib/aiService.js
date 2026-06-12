import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini client using the key from environment variables
// Note: In a production environment, AI calls should ideally be made from a backend server
// to keep the API key secure. For this implementation, we are using the frontend client.
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const ai = apiKey && apiKey !== 'paste_your_gemini_key_here' 
    ? new GoogleGenAI({ apiKey }) 
    : null;

export const aiService = {
    /**
     * Generate a daily Islamic moral or Hadith concerning marriage.
     */
    async generateDailyMoral() {
        if (!ai) return "May Allah bless your journey in finding a righteous spouse.";
        
        try {
            const prompt = `Provide a short, inspiring Islamic quote, Hadith, or moral specifically about marriage, family, or finding a spouse. Keep it under 50 words. Do not include any conversational filler, just the quote and reference.`;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            return response.text;
        } catch (error) {
            console.error("Error generating AI moral:", error);
            return "Patience and prayer are the keys to a blessed marriage.";
        }
    },

    /**
     * Generate an encouraging reminder for inactive users.
     */
    async generateReminder(userName) {
        if (!ai) return `Salam ${userName}, don't forget to check your new matches today!`;
        
        try {
            const prompt = `Write a short, friendly, and culturally appropriate reminder for a Muslim user named ${userName} who hasn't checked their matchmaking profile in a while. Encourage them to stay active in their search for a spouse while trusting in Allah's timing. Maximum 2 sentences.`;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            return response.text;
        } catch (error) {
            console.error("Error generating AI reminder:", error);
            return `Salam ${userName}, don't forget to check your new matches today!`;
        }
    },

    /**
     * Generate a smart context summary explaining why two users might be a good match.
     */
    async generateMatchContext(profile1, profile2) {
        if (!ai) return "You both share similar values and goals for marriage.";

        try {
            const prompt = `
                Analyze these two profiles of Muslims seeking marriage:
                Profile 1: ${profile1.profession}, Sect: ${profile1.sect}, Prays: ${profile1.praying_frequency}, Goals: ${profile1.seeking_description}
                Profile 2: ${profile2.profession}, Sect: ${profile2.sect}, Prays: ${profile2.praying_frequency}, Goals: ${profile2.seeking_description}
                
                Write a 2-3 sentence summary explaining why they might be a good match based on their shared Islamic values and lifestyle. Be encouraging and respectful.
            `;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            return response.text;
        } catch (error) {
            console.error("Error generating match context:", error);
            return "Based on your profiles, you both share strong Islamic values and aligned life goals.";
        }
    }
};
