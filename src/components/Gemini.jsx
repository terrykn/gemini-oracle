import { useState, useEffect } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// node --version # Should be >= 18
// npm install @google/generative-ai
  
const MODEL_NAME = "gemini-1.0-pro";
const GOOGLE_GEMINIAPI_KEY = process.env.REACT_APP_GOOGLE_GEMINIAPI_KEY;

function Gemini({ input }) {
    const [geminiResponse, setGeminiResponse] = useState('');

    async function runGemini(prompt) {
        const genAI = new GoogleGenerativeAI(GOOGLE_GEMINIAPI_KEY);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const generationConfig = {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
        };

        const safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
        ];

        const chat = model.startChat({
            generationConfig,
            safetySettings,
            history: [],
        });

        const result = await chat.sendMessage(prompt);
        const response = result.response;
        setGeminiResponse(response.text());
    }

    function handleGemini() {
        runGemini(input);
    }

    return (
        <div>
            {input}
            <button onClick={handleGemini}>Run Gemini</button>
            <p>Gemini Response: {geminiResponse}</p>
        </div>
    );
}

export default Gemini;