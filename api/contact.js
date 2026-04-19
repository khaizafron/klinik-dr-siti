export default async function handler(req, res) {
  // ❌ block method lain
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const GAS_URL = "https://script.google.com/macros/s/AKfycbw5lAYx75zZi3yGXO_sE7EyQGHQ3VrmJsQcSPFzNSkQAita6hxfd3S23FfMrv5MdKXddA/exec";

    const { name, phone, branch, message, token } = req.body;

    // 🔐 basic validation
    if (!token || token.length < 20) {
      return res.status(400).json({ success: false, error: "Invalid token" });
    }

    // 👉 forward ke Google Apps Script
    const response = await fetch(GAS_URL, {
      method: "POST",
      body: new URLSearchParams({
        name,
        phone,
        branch,
        message,
        token,
      }),
    });

    const text = await response.text();

    return res.status(200).send(text);

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.toString(),
    });
  }
}