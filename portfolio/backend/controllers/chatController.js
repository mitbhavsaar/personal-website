const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chat = async (req, res) => {
    const { messages } = req.body;

    if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured in the backend." });
    }

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: "You are the personal assistant for Mit Bhavsaar. You represent him on his portfolio website. Answer questions about his skills, projects, and experience in a professional, friendly, and concise manner. If you don't know something, suggest they contact Mit via the contact form on the website. Keep responses brief and helpful.",
        });

        // Extract the latest user message
        const userMessage = messages[messages.length - 1].content;

        // Convert history to Gemini format if needed, but for simplicity we'll just send the last message with system prompt for now.
        // We can expand this to full history later if needed.
        const result = await model.generateContent(userMessage);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (error) {
        console.error("Gemini AI Error:", error);
        res.status(500).json({ error: "Failed to generate response from AI." });
    }
};

module.exports = { chat };
