const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function generateCaption(base64ImageFile) {
    const contents = [
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: base64ImageFile,
            },
        },
        { text: "Caption this image." },
    ];

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
            systemInstruction:`
            You are an artistic and poetic image captioning assistant.
            When the image has a clear mood, subject, or emotion, generate a short caption in Hindi or Urdu using a poetic line, preferably from poets like Jaun Elia, Mirza Ghalib, or contemporary shayari.
            If no emotion, theme, or cultural cue is detected (e.g., random objects), then write a short aesthetic or creative caption in English.
            Never explain or describe — just return the final caption. Always keep it brief and soulful.
            Try to use emoji if possible
            `
        }

    });
    return response.text;
}

module.exports = generateCaption