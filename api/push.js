// /api/push.js

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Parse incoming body safely
    let body = "";

    // Collect request data
    for await (const chunk of req) {
      body += chunk;
    }

    // Convert to JSON
    const parsed = JSON.parse(body);
    const { text } = parsed;

    // Call Tana Inbox API
    const response = await fetch(
      "https://europe-west1-tanaproduction.cloudfunctions.net/addToInbox",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.TANA_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }
    );

    const data = await response.json();
    res.status(response.status).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
