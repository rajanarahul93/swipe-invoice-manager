import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

if (!GEMINI_API_KEY) {
  console.warn(
    "Gemini API key not found. Set VITE_GEMINI_API_KEY in .env file."
  );
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export interface ExtractedData {
  invoices: Array<{
    customerName?: string;
    productName?: string;
    quantity?: number;
    tax?: number;
    totalAmount?: number;
    date?: string;
  }>;
  products: Array<{
    name?: string;
    quantity?: number;
    unitPrice?: number;
    tax?: number;
  }>;
  customers: Array<{
    name?: string;
    phoneNumber?: string;
  }>;
}

export async function extractDataWithGemini(
  fileContent: string,
  fileName: string
): Promise<ExtractedData> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are a data extraction expert. Extract invoice, product, and customer data from the following content.
File: ${fileName}

Content:
${fileContent}

Return ONLY valid JSON in this exact format (no markdown, no code blocks):
{
  "invoices": [{"customerName": "", "productName": "", "quantity": 0, "tax": 0, "totalAmount": 0, "date": ""}],
  "products": [{"name": "", "quantity": 0, "unitPrice": 0, "tax": 0}],
  "customers": [{"name": "", "phoneNumber": ""}]
}

Rules:
- Extract ALL invoices, products, and customers found
- Use null for missing fields
- Dates in YYYY-MM-DD format
- Numbers as integers or floats
- Return empty arrays if no data found
    `.trim();

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in response");
    }

    const extracted = JSON.parse(jsonMatch[0]);
    return extracted as ExtractedData;
  } catch (error) {
    console.error("Gemini extraction error:", error);
    throw new Error(
      `Failed to extract data: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
