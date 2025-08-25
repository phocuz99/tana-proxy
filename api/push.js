export default async function handler(req, res) {
  try {
    const token = process.env.TANA_API_TOKEN;

    if (!token) {
      return res.status(500).json({ error: "TANA_API_TOKEN missing" });
    }

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { text } = req.body || {};
    if (!text) {
      return res.status(400).json({ error: "Missing 'text' in body" });
    }

    const response = await fetch(
      "https://europe-west1-tanaproduction.cloudfunctions.net/addToInbox",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }
    );

    // 🔍 Capture raw text instead of forcing JSON
    const raw = await response.text();

    return res.status(response.status).json({
      status: response.status,
      raw,
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
}
