export const synthesizeTutorial = async (topic, retrievedChunks) => {
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  if (!apiKey) {
    return {
      success: false,
      summary: "Notice: OPENROUTER_API_KEY is not configured in backend .env. Custom AI tutorial synthesis is offline. Displaying retrieved official documentation sources directly.",
    };
  }

  const context = retrievedChunks
    .map(c => `[Source: ${c.source} | Header: ${c.title}]\n${c.content}`)
    .join("\n\n");

  const prompt = `
You are an expert MERN Stack programming tutor. 
Use ONLY the official documentation context below to synthesize a concise, high-quality, W3Schools-style tutorial explaining the concept of "${topic}".
Include clear code block snippets, usage rules, and bullet points. 
Do not mention the word "context" or say "based on the provided context" or refer to search metrics. Present the tutorial directly as a clean document.

<context>
${context}
</context>

Concept to explain: ${topic}
`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct:free",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || "Failed request to OpenRouter API");
    }

    return {
      success: true,
      summary: data.choices[0].message.content.trim(),
    };
  } catch (err) {
    console.error("LLM Synthesize error:", err.message);
    return {
      success: false,
      summary: `AI synthesis failed: ${err.message}. Falling back to raw documentation chunks.`,
    };
  }
};
