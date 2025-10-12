import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return Response.json({ error: "Brak GEMINI_API_KEY" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Test różnych modeli
    const modelsToTest = [
      "gemini-pro",
      "gemini-1.5-flash", 
      "gemini-1.5-pro",
      "gemini-1.5-flash-latest"
    ];

    const results = [];

    for (const modelName of modelsToTest) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Test");
        results.push({
          model: modelName,
          status: "✅ Działa",
          response: result.response.text().substring(0, 50) + "..."
        });
      } catch (error: any) {
        results.push({
          model: modelName,
          status: "❌ Błąd",
          error: error.message.substring(0, 100) + "..."
        });
      }
    }

    return Response.json({
      apiKey: process.env.GEMINI_API_KEY ? "✅ Ustawiony" : "❌ Brak",
      models: results
    });

  } catch (error: any) {
    return Response.json({ 
      error: "Błąd testowania API",
      details: error.message 
    }, { status: 500 });
  }
}