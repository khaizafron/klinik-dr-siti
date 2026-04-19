// =========================
// 📞 WHATSAPP CONFIG
// =========================
const WA_NUMBER_MAIN = "601136043101";

// Kalau nanti nak tambah branch, expand sini
const WHATSAPP_NUMBERS = {
  main: WA_NUMBER_MAIN,
  // branch: "60123456789"
};

// =========================
// 🔗 GENERATE WHATSAPP LINK
// =========================
export function getWaLink(message, target = "main") {
  const encoded = encodeURIComponent(message);

  const isDev = window.location.origin.includes("localhost");

  // =========================
  // 🧪 DEV MODE (DIRECT LINK)
  // =========================
  if (isDev) {
    const number = WHATSAPP_NUMBERS[target] || WHATSAPP_NUMBERS.main;
    return `https://wa.me/${number}?text=${encoded}`;
  }

  // =========================
  // 🚀 PRODUCTION (SECURED API)
  // =========================
  return `/api/whatsapp?msg=${encoded}&to=${target}`;
}