const WHATSAPP_NUMBERS = {
  main: "601136043101",
  branch: "60123456789"
};

const rateLimitMap = new Map();

function rateLimit(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const max = 5;

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, start: now });
    return true;
  }

  const data = rateLimitMap.get(ip);

  if (now - data.start > windowMs) {
    rateLimitMap.set(ip, { count: 1, start: now });
    return true;
  }

  data.count++;

  if (data.count > max) return false;

  return true;
}

export default function handler(req, res) {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress ||
    "unknown";

  // HEAD check
  if (req.method === "HEAD") {
    return res.status(200).end();
  }

  // rate limit
  if (!rateLimit(ip)) {
    return res.status(429).json({
      success: false,
      error: "Too many requests"
    });
  }

  const { msg, to } = req.query;

  // ❌ VALIDATION (IMPORTANT)
  if (!msg) {
    return res.status(400).json({
      success: false,
      error: "Missing message"
    });
  }

  const number = WHATSAPP_NUMBERS[to] || WHATSAPP_NUMBERS.main;

  const encoded = encodeURIComponent(msg);

  const url = `https://wa.me/${number}?text=${encoded}`;

  return res.redirect(url);
}