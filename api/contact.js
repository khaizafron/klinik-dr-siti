// =========================
// 🔐 SIMPLE RATE LIMIT (IN-MEMORY)
// =========================
const rateLimitMap = new Map();

function rateLimit(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 5; // max 5 requests per minute

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, start: now });
    return true;
  }

  const data = rateLimitMap.get(ip);

  // reset window
  if (now - data.start > windowMs) {
    rateLimitMap.set(ip, { count: 1, start: now });
    return true;
  }

  // block if exceed
  if (data.count >= maxRequests) {
    return false;
  }

  data.count++;
  return true;
}

// =========================
// 🚀 MAIN HANDLER
// =========================
export default async function handler(req, res) {
  // ❌ block method lain
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const GAS_URL = "https://script.google.com/macros/s/AKfycbw5lAYx75zZi3yGXO_sE7EyQGHQ3VrmJsQcSPFzNSkQAita6hxfd3S23FfMrv5MdKXddA/exec";

    const { name, phone, branch, message, token } = req.body;

    // =========================
    // 🌐 GET USER IP
    // =========================
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.socket?.remoteAddress ||
      "unknown";

    // =========================
    // 🚫 RATE LIMIT CHECK
    // =========================
    if (!rateLimit(ip)) {
      return res.status(429).json({
        success: false,
        error: "Too many requests. Please try again later.",
      });
    }

    // =========================
    // 🔐 BASIC VALIDATION
    // =========================
    if (!token || token.length < 20) {
      return res.status(400).json({ success: false, error: "Invalid token" });
    }

    if (!name || !phone || !message) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    // =========================
    // 📤 FORWARD TO GAS
    // =========================
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