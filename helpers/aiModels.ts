import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not defined");
}
const genAI = new GoogleGenerativeAI(apiKey);

export async function answerQuestion(question: string) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const result = await model.generateContent([`
        Necesito que te comportes como un nutricionista profesional que debe responder de manera corta a una pregunta que se te va a hacer sobre nutricion no debes responder ninguna pregunta que no tenga que ver con nutricion, alimentacion o comida.

        A continuación se te hará una pregunta sobre nutrición, alimentación o comida, por favor responde de manera corta y precisa: \n
        ${question}
`])

        return result.response.text();
}