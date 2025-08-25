// api/push.js

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { text } = req.body;

    const response = await fetch(
      "https://europe-west1-tanaproduction.cloudfunctions.net/addToNode", // <-- updated endpoint
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.TANA_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Upstream error",
        status: response.status,
        data: data || null,
      });
    }

    res.status(200).json({
      success: true,
      tanaResponse: data,
    });
  } catch (err) {
    res.status(500).json({ error: er
