export default async function handler(req, res) {

  try {

    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({
        reply: "No message provided."
      });
    }

    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        method: "POST",

        headers: {
          "Authorization": `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          inputs:
            "You are ERROR AI, the official assistant of ERROR Corporation. You are futuristic, calm, intelligent, and helpful.\n\n" +
            "User: " + userMessage + "\n" +
            "Assistant:"
        })

      }
    );

    const data = await response.json();

    console.log("HF RESPONSE:", data);

    /* HANDLE HUGGING FACE RATE LIMIT / LOADING */
    if (!response.ok) {
      return res.status(response.status).json({
        reply:
          data?.error ||
          "Hugging Face request failed."
      });
    }

    /* EXTRACT REPLY */
    const reply =
      data?.[0]?.generated_text?.split("Assistant:")[1]?.trim() ||
      data?.generated_text ||
      data?.[0]?.generated_text;

    if (!reply) {
      return res.status(500).json({
        reply: "ERROR AI returned an empty response."
      });
    }

    return res.status(200).json({
      reply
    });

  }

  catch (error) {

    console.error("SERVER ERROR:", error);

    return res.status(500).json({
      reply: "Server error occurred while contacting ERROR AI."
    });

  }

}
