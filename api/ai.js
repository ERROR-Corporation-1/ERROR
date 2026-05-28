export default async function handler(req, res) {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({
        reply: "No message provided."
      });
    }

    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/gemma-2-9b-it",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: `
You are ERROR AI, the official assistant of ERROR Corporation.
You are futuristic, calm, intelligent, and helpful.

User: ${userMessage}
Assistant:
          `
        })
      }
    );

    const data = await response.json();

    console.log("HF RESPONSE:", data);

    if (!response.ok) {
      return res.status(response.status).json({
        reply:
          data?.error ||
          "Hugging Face request failed."
      });
    }

    // HF sometimes returns different formats
    const reply =
      data?.[0]?.generated_text ||
      data?.generated_text;

    if (!reply) {
      return res.status(500).json({
        reply: "ERROR AI returned an empty response."
      });
    }

    return res.status(200).json({
      reply
    });

  } catch (error) {
    console.error("SERVER ERROR:", error);

    return res.status(500).json({
      reply: "Server error occurred while contacting ERROR AI."
    });
  }
}
