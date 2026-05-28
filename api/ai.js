export default async function handler(req, res) {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({
        reply: "No message provided."
      });
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://error-lake.vercel.app",
          "X-Title": "ERROR Corporation AI"
        },

        body: JSON.stringify({
          // SAFE WORKING FREE MODEL (fallback-safe)
          model: "meta-llama/llama-3.1-8b-instruct",

          messages: [
            {
              role: "system",
              content:
                "You are ERROR AI, the official assistant of ERROR Corporation. You are mysterious, futuristic, calm, intelligent, and helpful."
            },
            {
              role: "user",
              content: userMessage
            }
          ],

          temperature: 0.7,
          max_tokens: 500
        })
      }
    );

    const data = await response.json();

    console.log("OPENROUTER RESPONSE:", data);

    // HARD ERROR CHECK (IMPORTANT)
    if (!response.ok) {
      return res.status(response.status).json({
        reply:
          data?.error?.message ||
          data?.error ||
          "OpenRouter request failed."
      });
    }

    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({
        reply: "ERROR AI returned an empty response."
      });
    }

    return res.status(200).json({ reply });

  } catch (error) {
    console.error("SERVER ERROR:", error);

    return res.status(500).json({
      reply: "Server error occurred while contacting ERROR AI."
    });
  }
}
