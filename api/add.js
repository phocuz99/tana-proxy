export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const response = await fetch(
      "https://europe-west1-tagr-prod.cloudfunctions.net/addToNodeV2",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + process.env.TANA_API_TOKEN,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body)
      }
    );

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
