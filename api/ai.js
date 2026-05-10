export default async function handler(req, res) {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ reply: "No message provided." });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://your-site.com",
        "X-Title": "ERROR Corporation AI"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          {
            role: "system",
            content: "You are ERROR AI, the official assistant of ERROR Corporation. You are slightly mysterious, helpful, and speak in a clean futuristic tone."
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    });

    const data = await response.json();

    const reply =
      data?.choices?.[0]?.message?.content ||
      "ERROR AI failed to respond.";

    res.status(200).json({ reply });

  } catch (error) {
    res.status(500).json({
      reply: "Server error occurred while contacting ERROR AI."
    });
  }
}
