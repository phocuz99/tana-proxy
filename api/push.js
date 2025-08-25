// /api/push.js
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    let body = "";
    for await (const chunk of req) {
      body += chunk;
    }

    res.status(200).json({
      message: "Proxy is working ✅",
      received: body
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
