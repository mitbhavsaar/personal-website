const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function test() {
    const apiKey = process.env.GEMINI_API_KEY;
    console.log("Using API Key:", apiKey.substring(0, 10) + "...");
    const genAI = new GoogleGenerativeAI(apiKey);
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const result = await model.generateContent("Hi");
        const response = await result.response;
        console.log("Success with gemini-flash-latest:", response.text());
    } catch (error) {
        console.error("Error with gemini-flash-latest:", error.message);
    }
}

test();
