import * as webllm from "@mlc-ai/web-llm";

let engine: webllm.MLCEngine | null = null;

const modelId = "Llama-3.2-1B-Instruct-q4f32_1-MLC";

export async function supportsLocalAi() {
  return "gpu" in navigator;
}

export async function loadLocalAi(onProgress?: (message: string) => void) {
  if (engine) return engine;

  engine = await webllm.CreateMLCEngine(modelId, {
    initProgressCallback: (progress) => {
      onProgress?.(progress.text);
    },
  });

  return engine;
}

export async function askLocalAi(prompt: string, context: string) {
  if (!engine) {
    throw new Error("Local AI model has not been loaded yet.");
  }

  const response = await engine.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are Mark Nalbach's portfolio assistant. Answer naturally and confidently using the provided portfolio information. Never mention context, sources, retrieved information, or provided data. Speak directly. Keep responses concise and professional. When discussing projects, explain what was built, why it was built, and the technologies involved. If the answer is not available, say you do not know.",
      },
      {
        role: "user",
        content: `Portfolio context:\n${context}\n\nQuestion:\n${prompt}`,
      },
    ],
    temperature: 0.1,
  });

  return response.choices[0]?.message.content ?? "I could not generate a response.";
}
