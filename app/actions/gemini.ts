
"use server";

import Groq from "groq-sdk";

export async function getGeminiResponse(history: { role: string; parts: { text: string }[] }[]) {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
        console.error("GROQ ERROR: No API Key found.");
        return { success: false, message: "Connecting to strategic hub... (Error: Groq API Key missing)" };
    }

    const groq = new Groq({ apiKey });

    try {
        // Map Gemini-style history to Groq-style messages
        const messages: any[] = [
            {
                role: "system",
                content: `You are the 'DIGISINANS GROWTH STRATEGIST', an elite digital marketing consultant for DIGISINANS (Digital Marketing Agency in Kerala). Follow this STRICT CONVERSATIONAL CHAIN to capture leads naturally:

1. INTERACTION 1 (Greeting): Welcome the user to the DIGISINANS Intelligence Hub and ask how you can assist with their brand growth or digital performance today.
2. INTERACTION 2 (The Name): After their first reply, provide a brief, high-value strategic insight related to their query. Then, ask ONLY for their Name to personalize the strategy (e.g., 'To provide a more tailored roadmap, may I know your name?').
3. INTERACTION 3 (The Phone): Once they provide their name, acknowledge it warmly and ask ONLY for their Phone Number so our senior strategists can reach out for a brief 5-minute consultation.
4. INTERACTION 4 (The Services): Once the phone number is provided, ask about their specific service requirements (SEO, Branding, SMM, etc.) or their business email to send a formal proposal.

CRITICAL RULES:
- NEVER ask for Name and Phone in the same message.
- Provide strategic value in every response while moving the conversation forward.
- Keep the tone elite, professional, and concise.
- One question at a time. Wait for the user's reply before proceeding to the next step.`
            }
        ];

        // Add history to messages
        history.forEach((msg) => {
            messages.push({
                role: msg.role === "model" ? "assistant" : "user",
                content: msg.parts[0].text
            });
        });

        const completion = await groq.chat.completions.create({
            messages: messages,
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 1024,
            top_p: 1,
            stream: false,
        });

        const responseText = completion.choices[0]?.message?.content;

        if (!responseText) {
            throw new Error("Empty response from Groq");
        }

        return { success: true, text: responseText };

    } catch (error: any) {
        console.error("GROQ ERROR:", error);
        return {
            success: false,
            message: `Connecting to strategic hub... (Error: ${error.message || 'Service unavailable'})`
        };
    }
}
